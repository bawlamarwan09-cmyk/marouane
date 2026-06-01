"use client";

import {
  MonitorSmartphone,
  Workflow,
  Sparkles,
  Target,
  Briefcase,
  LineChart,
  Handshake,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";
import ScrollStackCards, { type StackCard } from "@/components/ui/scroll-card";

type Service = {
  icon: typeof Workflow;
  title: string;
  desc: string;
  points: string[];
  accent: string;
};

const services: Service[] = [
  {
    icon: MonitorSmartphone,
    title: "Business Websites That Convert",
    desc: "High-performance websites engineered to turn visitors into customers — fast, polished, and built to grow your revenue.",
    points: ["Conversion-focused UX", "Lightning-fast performance"],
    accent: "from-navy-700 to-blue-600",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "I eliminate repetitive manual work with reliable n8n & API automations so your team can focus on what actually drives growth.",
    points: ["Save 20+ hours / month", "Zero manual errors"],
    accent: "from-blue-600 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Solutions",
    desc: "From smart assistants to intelligent automations, I integrate AI that cuts costs and unlocks new efficiency across your business.",
    points: ["Reduce operating costs", "Smarter decisions, faster"],
    accent: "from-teal-500 to-navy-700",
  },
];

const stats = [
  { value: "20+", label: "Projects delivered" },
  { value: "100%", label: "Tailored custom solutions" },
  { value: "20h+", label: "Saved monthly via automation" },
  { value: "5★", label: "Client satisfaction" },
];

const reasons = [
  {
    icon: Target,
    title: "Problem-Solving Mindset",
    desc: "I start with your business challenge, not the tech. Every solution is designed to remove a real bottleneck.",
  },
  {
    icon: Briefcase,
    title: "Business-First Approach",
    desc: "I speak outcomes — revenue, time saved, and efficiency — not jargon. Your goals drive every decision.",
  },
  {
    icon: LineChart,
    title: "Focus on Measurable Results",
    desc: "Faster processes, lower costs, higher conversions. I build for impact you can actually measure.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    desc: "I'm a reliable partner invested in your growth — supporting and scaling your systems well beyond launch.",
  },
];

const reasonAccents = [
  "from-navy-700 to-blue-600",
  "from-blue-600 to-teal-500",
  "from-teal-500 to-navy-700",
  "from-navy-600 to-teal-500",
];

export default function About() {
  const reasonCards: StackCard[] = reasons.map((r, i) => ({
    title: r.title,
    description: r.desc,
    icon: <r.icon size={22} />,
    accent: reasonAccents[i % reasonAccents.length],
  }));

  return (
    <>
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Background glow + decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-navy-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute inset-0 bg-dotted opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="container-px mx-auto max-w-7xl">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-700 shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              What I do
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
              I build digital solutions that{" "}
              <span className="text-gradient">save time, reduce costs,</span> and
              help businesses grow.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              I partner with business owners and startups to replace slow,
              manual processes with fast websites, smart automations, and
              AI-driven systems — so you can scale with less effort and stronger
              results.
            </p>
          </div>
        </Reveal>

        {/* Outcome-driven service cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="group relative h-full rounded-[1.5rem] bg-gradient-to-br from-slate-200/70 to-slate-100/40 p-[1px] shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
                {/* gradient border on hover */}
                <div className="absolute inset-0 rounded-[1.5rem] bg-accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[1.45rem] bg-white/80 p-7 backdrop-blur-xl">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-card transition-transform duration-300 group-hover:scale-110`}
                  >
                    <s.icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {s.desc}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm font-medium text-slate-700"
                      >
                        <ArrowRight size={15} className="text-teal-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute -bottom-14 -right-14 h-36 w-36 rounded-full bg-accent-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Credibility stats band */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-hidden rounded-[1.75rem] border border-white/40 bg-accent-gradient p-8 shadow-glow md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-dotted opacity-15" />
            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-white/75">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>

    {/* Why work with me — stacking scroll cards (no overflow-hidden ancestor) */}
    <section className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center lg:hidden">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why work with <span className="text-gradient">me</span>
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              More than a developer — a results-driven partner focused on your
              growth.
            </p>
          </div>
        </Reveal>
      </div>

      <ScrollStackCards
        cards={reasonCards}
        sideTitle={
          <div className="max-w-xs">
            <h3 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">
              Why work <span className="text-gradient">with me</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              More than a developer — a results-driven partner focused on your
              growth.
            </p>
          </div>
        }
      />

      <div className="container-px mx-auto max-w-7xl">
        <div className="flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-navy-800 hover:shadow-glow"
          >
            Let&apos;s grow your business
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
