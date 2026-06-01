"use client";

import { useState, FormEvent } from "react";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import { WatchingCloud } from "@/components/ui/cloud-watch-form";
import { useLanguage } from "@/lib/i18n";

const EMAIL = "marouanebaoulla@gmail.com";
const WHATSAPP = "212762659666"; // international format without "+"

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || t.contact.errorGeneric);
      }
      setSent(true);
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : t.contact.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: info */}
            <div className="relative overflow-hidden bg-accent-gradient p-8 text-white md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-dotted opacity-15" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t.contact.heading}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
                  {t.contact.intro}
                </p>

                <div className="mt-10 space-y-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <Mail size={20} />
                    </span>
                    <div>
                      <div className="text-xs font-medium text-white/70">{t.contact.emailLabel}</div>
                      <div className="text-sm font-semibold">{EMAIL}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <MessageCircle size={20} />
                    </span>
                    <div>
                      <div className="text-xs font-medium text-white/70">
                        {t.contact.whatsapp}
                      </div>
                      <div className="text-sm font-semibold">
                        {t.contact.whatsappSub}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-8 md:p-12">
              {/* Watching cloud — looks away while you type your message */}
              <div className="mb-6 flex justify-center">
                <WatchingCloud isTyping={isTyping} />
              </div>
              <Reveal>
                {sent ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-500">
                      <CheckCircle2 size={28} />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-slate-900">
                      {t.contact.sentTitle}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {t.contact.sentDesc}
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 text-sm font-semibold text-navy-700 hover:underline"
                    >
                      {t.contact.sendAnother}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot — hidden from users, bots fill it */}
                    <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        {t.contact.name}
                      </label>
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder={t.contact.namePlaceholder}
                        maxLength={100}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-navy-700 focus:bg-white focus:ring-4 focus:ring-navy-700/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        {t.contact.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder={t.contact.emailPlaceholder}
                        maxLength={200}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-navy-700 focus:bg-white focus:ring-4 focus:ring-navy-700/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        {t.contact.message}
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder={t.contact.messagePlaceholder}
                        maxLength={5000}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-navy-700 focus:bg-white focus:ring-4 focus:ring-navy-700/10"
                      />
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                      >
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-700 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-navy-800 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? t.contact.sending : t.contact.send}
                      {!loading && (
                        <Send
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
