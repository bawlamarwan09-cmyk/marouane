import Hero from "@/components/Hero";
import About from "@/components/About";
import ProblemSolution from "@/components/ProblemSolution";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar";
import LanguageToggle from "@/components/ui/language-toggle";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      {/* 3D adaptive floating navigation pill */}
      <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <PillBase />
      </div>

      {/* Language switch */}
      <div className="fixed right-4 top-5 z-50 sm:right-6">
        <LanguageToggle />
      </div>

      {/* Scrolling content sits above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-background">
        <Hero />
        <About />
        <ProblemSolution />
        <Projects />
        <Skills />
        <Contact />
      </div>
      <CinematicFooter />
    </main>
  );
}
