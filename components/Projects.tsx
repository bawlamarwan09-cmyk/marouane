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
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

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

const projects: Project[] = [
  {
    icon: CalendarCheck,
    name: "Hotel Reservation System",
    tagline: "Automated bookings with real-time availability.",
    problem: "Manual booking system causing double reservations and confusion.",
    solution:
      "Automated hotel reservation system with real-time availability control, admin dashboard, and email confirmation.",
    result: "No booking conflicts and a faster reservation process.",
    stack: ["Next.js", "PHP", "MySQL", "n8n"],
    demo: "#",
    image: "/projects/hotel.png",
    accent: "from-navy-700 to-blue-600",
  },
  {
    icon: Dumbbell,
    name: "Sports Hall Management System",
    tagline: "Members, subscriptions & attendance in one place.",
    problem: "Gym/sports hall had no structured system to manage members and subscriptions.",
    solution:
      "Full management system for members, subscriptions, attendance tracking, and an admin dashboard.",
    result: "Better organization and automated tracking of members.",
    stack: ["React", "PHP", "MySQL"],
    demo: "https://rachidgym.vercel.app/",
    image: "/projects/gym.png",
    accent: "from-blue-600 to-teal-500",
  },
  {
    icon: GraduationCap,
    name: "Orient AI Platform",
    tagline: "AI-powered study & career guidance.",
    problem: "Users struggle to get guidance on what to study or which career path to choose.",
    solution:
      "AI-powered platform that analyzes the user profile and suggests study paths, careers, and recommendations.",
    result: "Personalized guidance and smarter decision making.",
    stack: ["Next.js", "OpenAI API", "Node.js"],
    demo: "#",
    image: "/projects/orient.png",
    accent: "from-teal-500 to-navy-700",
  },
  {
    icon: Ticket,
    name: "Event Management System",
    tagline: "Registrations, QR check-in & notifications.",
    problem: "Manual event organization with messy registrations and no automation.",
    solution:
      "Event platform with a registration system, QR check-in, and automated notifications.",
    result: "Smooth event organization and a faster check-in process.",
    stack: ["Next.js", "APIs", "n8n", "MongoDB"],
    demo: "https://jawhara-theta.vercel.app/",
    image: "/projects/event.png",
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

  const slides = projects.map((p) => (
    <button
      key={p.name}
      type="button"
      onClick={() => setActive(p)}
      aria-label={`View details for ${p.name}`}
      className="group/slide relative block h-60 w-80 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-shadow duration-300 hover:shadow-glow md:h-72 md:w-[26rem]"
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
        View details
      </span>
    </button>
  ));

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-700 shadow-soft">
              Projects
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Real solutions, <span className="text-gradient">real results</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              A selection of systems built to solve concrete business problems.
              <span className="mt-1 block text-sm text-slate-500">
                Hover to pause · click any project for full details.
              </span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Auto-scrolling project slider (full width) */}
      <div className="mt-14">
        <ImageAutoSlider slides={slides} speed={38} />
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
                      Problem
                    </span>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {active.problem}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-navy-700">
                      Solution
                    </span>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {active.solution}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                      Result
                    </span>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {active.result}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={active.demo}
                  target={active.demo === "#" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group/btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-5 py-3 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:shadow-glow"
                >
                  View Live Demo
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
