"use client";

import {
  Clock,
  TrendingDown,
  Unplug,
  UserMinus,
  Workflow,
  Rocket,
  Bot,
  Gauge,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { useLanguage } from "@/lib/i18n";

const problemIcons = [Clock, TrendingDown, Unplug, UserMinus];
const solutionIcons = [Workflow, Rocket, Bot, Gauge];

export default function ProblemSolution() {
  const { t } = useLanguage();
  const problems = t.problem.problems.map((p, i) => ({
    ...p,
    icon: problemIcons[i],
  }));
  const solutions = t.problem.solutions.map((s, i) => ({
    ...s,
    icon: solutionIcons[i],
  }));
  return (
    <section id="solutions" className="relative bg-white py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-dotted opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Scroll-driven word-by-word reveal */}
      <TextRevealByWord text={t.problem.reveal} className="relative" />

      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-700 shadow-soft">
              {t.problem.badge}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.problem.headingPre}{" "}
              <span className="text-gradient">{t.problem.headingHi}</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Problems */}
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-rose-100 bg-rose-50/40 p-6 md:p-7">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-600">
                  {t.problem.problemsTitle}
                </h3>
              </div>
              <div className="space-y-3">
                {problems.map((p) => (
                  <div
                    key={p.text}
                    className="group flex items-start gap-3.5 rounded-2xl border border-rose-100 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                      <p.icon size={19} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {p.text}
                      </div>
                      <div className="text-xs text-slate-500">{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Arrow divider */}
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gradient text-white shadow-glow lg:rotate-0">
              <ArrowRight size={22} className="lg:block hidden" />
              <ArrowRight size={22} className="lg:hidden block rotate-90" />
            </div>
          </div>

          {/* Solutions */}
          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-3xl border border-teal-100 bg-teal-50/40 p-6 md:p-7">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                  {t.problem.solutionsTitle}
                </h3>
              </div>
              <div className="space-y-3">
                {solutions.map((s) => (
                  <div
                    key={s.text}
                    className="group flex items-start gap-3.5 rounded-2xl border border-teal-100 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <s.icon size={19} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {s.text}
                      </div>
                      <div className="text-xs text-slate-500">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
