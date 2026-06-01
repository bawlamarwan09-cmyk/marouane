"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const nav = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-gradient text-sm font-bold text-white">
            MB
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Marouane Baoulla
            </div>
            <div className="text-xs text-slate-500">
              Web Developer &amp; Automation Specialist
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-navy-700"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:marouane.baoulla@example.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-0.5 hover:border-navy-700/30 hover:text-navy-700 hover:shadow-soft"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 py-5">
        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Marouane Baoulla. Built with Next.js &amp;
          Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
