"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  Dumbbell,
  GraduationCap,
  Ticket,
  ExternalLink,
  Maximize2,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n";

type Project = {
  icon: typeof CalendarCheck;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  demo: string;
  image: string;
  accent: string;
};

/** Language-independent project data (icon, links, image, stack). */
const projectMeta = [
  {
    icon: CalendarCheck,
    stack: ["Next.js", "PHP", "MySQL", "n8n"],
    demo: "#",
    image: "https://ik.imagekit.io/latsqiyxk/New%20Folder/hotel.png",
    accent: "from-navy-700 to-blue-600",
  },
  {
    icon: Dumbbell,
    stack: ["React", "PHP", "MySQL"],
    demo: "https://rachidgym.vercel.app/",
    image: "https://ik.imagekit.io/latsqiyxk/New%20Folder/gym.png",
    accent: "from-blue-600 to-teal-500",
  },
  {
    icon: GraduationCap,
    stack: ["Next.js", "OpenAI API", "Node.js"],
    demo: "#",
    image: "https://ik.imagekit.io/latsqiyxk/New%20Folder/orient.png",
    accent: "from-teal-500 to-navy-700",
  },
  {
    icon: Ticket,
    stack: ["Next.js", "APIs", "n8n", "MongoDB"],
    demo: "https://jawhara-theta.vercel.app/",
    image: "https://ik.imagekit.io/latsqiyxk/New%20Folder/event.png",
    accent: "from-navy-700 to-teal-500",
  },
];

/** Thumbnail that shows the project image, gracefully falling back to a
 *  branded gradient + icon if the image hasn't been added yet. */
function ProjectThumb({ project }: { project: Project }) {
  const [error, setError] = useState(false);
  const Icon = project.icon;

  return (
    <div
      className={`relative h-full w-full bg-gradient-to-br ${project.accent}`}
    >
      {!error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.name}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4">
          <div className="absolute inset-0 bg-dotted opacity-20" />
          <span className="relative text-center text-base font-semibold text-white/90">
            {project.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const projects: Project[] = projectMeta.map((m, i) => ({
    ...m,
    ...t.projects.items[i],
  }));
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-700 shadow-soft">
              {t.projects.badge}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.projects.headingPre}{" "}
              <span className="text-gradient">{t.projects.headingHi}</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {t.projects.intro}
              <span className="mt-1 block text-sm text-slate-500">
                {t.projects.hint}
              </span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Manually scrollable project rail (swipe / drag / scroll) */}
      <div className="mt-14">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          {projects.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(p)}
              aria-label={`${t.projects.viewDetails} — ${p.name}`}
              className="group/slide relative block h-60 w-80 shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-shadow duration-300 hover:shadow-glow md:h-72 md:w-[26rem]"
            >
              <div className="h-full w-full transition-transform duration-500 group-hover/slide:scale-105">
                <ProjectThumb project={p} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 via-navy-900/35 to-transparent p-5 text-left">
                <h3 className="text-base font-semibold text-white">{p.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/80">{p.tagline}</p>
              </div>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy-700 opacity-0 shadow-card backdrop-blur transition-opacity duration-300 group-hover/slide:opacity-100">
                <Maximize2 size={13} />
                {t.projects.viewDetails}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/60 bg-white shadow-glow"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-card backdrop-blur transition-colors hover:text-navy-700"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl">
                <ProjectThumb project={active} />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {active.name}
                </h3>

                <div className="mt-6 space-y-4 text-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                      {t.projects.problem}
                    </span>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {active.problem}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-navy-700">
                      {t.projects.solution}
                    </span>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {active.solution}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                      {t.projects.result}
                    </span>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {active.result}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={active.demo}
                  target={active.demo === "#" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group/btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-5 py-3 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:shadow-glow"
                >
                  {t.projects.viewDemo}
                  <ExternalLink
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
