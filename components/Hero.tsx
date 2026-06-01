"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Mail, Code2, Workflow, Sparkles, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const scrollRotate = useTransform(scrollYProgress, [0, 0.5], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  // Interactive 3D tilt that follows the cursor over the portrait
  const pointerX = useMotionValue(0); // -0.5 .. 0.5
  const pointerY = useMotionValue(0); // -0.5 .. 0.5
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 15,
  });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateX = useTransform(
    [scrollRotate, tiltX],
    ([s, t]: number[]) => s + t
  );
  const rotateY = tiltY;

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-navy-100 via-blue-50 to-teal-50 opacity-70 blur-3xl" />
        <div className="absolute inset-0 bg-dotted opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="container-px mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 pb-20 md:pb-28 lg:grid-cols-2 lg:gap-10">
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-soft backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            {t.hero.available}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Marouane Baoulla
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-xl font-semibold text-gradient sm:text-2xl"
          >
            {t.hero.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-navy-700 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-navy-800 hover:shadow-glow"
            >
              {t.hero.viewWork}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-soft transition-all duration-300 hover:border-navy-700/30 hover:text-navy-700"
            >
              <Mail size={18} />
              {t.hero.contactMe}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-slate-200/70 pt-8"
          >
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-xs font-medium text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: portrait + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent-gradient opacity-20 blur-2xl animate-pulse-slow" />

          {/* Portrait — interactive 3D tilt on hover + flattens on scroll */}
          <div
            ref={portraitRef}
            style={{ perspective: "1000px" }}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
              className="relative overflow-hidden rounded-[1.75rem] shadow-2xl drop-shadow-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="https://ik.imagekit.io/latsqiyxk/New%20Folder/marouane.png"
                  alt="Marouane Baoulla"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Floating card: Web dev */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-10 hidden rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-card backdrop-blur sm:flex sm:items-center sm:gap-3 lg:-left-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Code2 size={20} />
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {t.hero.cardWeb}
              </div>
              <div className="text-xs text-slate-500">Next.js · React</div>
            </div>
          </motion.div>

          {/* Floating card: Automation */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 bottom-16 hidden rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-card backdrop-blur sm:flex sm:items-center sm:gap-3 lg:-right-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-500">
              <Workflow size={20} />
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {t.hero.cardAuto}
              </div>
              <div className="text-xs text-slate-500">n8n · APIs</div>
            </div>
          </motion.div>

          {/* Floating chip: AI */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-slate-100 bg-white/95 px-4 py-2 shadow-card backdrop-blur sm:flex"
          >
            <Sparkles size={16} className="text-navy-700" />
            <span className="text-xs font-semibold text-slate-700">
              {t.hero.chipAi}
            </span>
            <CheckCircle2 size={16} className="text-teal-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
