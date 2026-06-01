"use client";

import { useLanguage } from "@/lib/i18n";

/**
 * Compact EN / FR language switch styled to match the floating nav pill.
 */
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-white/60 bg-white/80 p-1 shadow-card backdrop-blur"
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              active
                ? "bg-navy-700 text-white shadow-soft"
                : "text-slate-500 hover:text-navy-700"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
