import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.example.CONTACT_TO_EMAIL || "marouanebaoulla@gmail.com";
// Use your verified Resend domain in production, e.g. "Marouane <hello@your-domain.com>"
const FROM_EMAIL =
  process.env.example.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Simple in-memory rate limit (per server instance).
// Good enough to deter casual abuse on a portfolio.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3; // max submissions per IP per window
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    // Identify caller (first IP in x-forwarded-for, fallback to a static key)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const limit = rateLimit(ip);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const body = (await req.json().catch(() => null)) as {
      name?: string;
      email?: string;
      message?: string;
      company?: string; // honeypot
    } | null;

    if (!body) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot — silently accept and drop bot submissions
    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Fire-and-forget webhook (e.g. n8n) — never blocks the user response
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          ip,
          userAgent: req.headers.get("user-agent") || "",
          submittedAt: new Date().toISOString(),
          source: "portfolio-contact-form",
        }),
      }).catch((e) => {
        console.error("[contact] webhook failed:", e);
      });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin: 0 0 12px;">New portfolio message</h2>
          <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <div style="white-space: pre-wrap; padding: 16px; background: #f1f5f9; border-radius: 12px;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
