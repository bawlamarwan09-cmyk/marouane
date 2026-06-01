"use client";

import Reveal from "./Reveal";

const skills = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "JavaScript",
  "PHP",
  "n8n",
  "API Integration",
  "AI Tools",
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative bg-white">
      <div className="container-px mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-700 shadow-soft">
              Skills
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The <span className="text-gradient">stack</span> I build with
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {skills.map((s) => (
              <span
                key={s}
                className="cursor-default rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy-700/30 hover:text-navy-700 hover:shadow-card"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
