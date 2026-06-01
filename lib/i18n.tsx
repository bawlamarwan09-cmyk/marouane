"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "fr";

/* ------------------------------------------------------------------ */
/*  Dictionary                                                         */
/* ------------------------------------------------------------------ */

const en = {
  nav: {
    home: "Home",
    about: "About",
    solutions: "Solutions",
    projects: "Projects",
    skills: "Skills",
    story: "Story",
    contact: "Contact",
  },
  hero: {
    available: "Available for freelance & contract work",
    role: "Web Developer & Automation Specialist",
    tagline:
      "I build fast, scalable web applications and automate business workflows using AI and modern tools.",
    viewWork: "View My Work",
    contactMe: "Contact Me",
    stats: [
      { value: "20+", label: "Projects delivered" },
      { value: "100%", label: "Workflow automation" },
      { value: "5★", label: "Client satisfaction" },
    ],
    cardWeb: "Modern Web Apps",
    cardAuto: "Automation",
    chipAi: "AI-powered integrations",
  },
  about: {
    badge: "What I do",
    headingPre: "I build digital solutions that",
    headingHi: "save time, cut costs,",
    headingPost: "and help businesses grow.",
    intro:
      "I help businesses replace slow, manual work with fast websites, smart automations, and AI — so you scale with less effort.",
    services: [
      {
        title: "Websites That Convert",
        desc: "Fast, polished websites built to turn visitors into customers.",
        points: ["Conversion-focused UX", "Lightning-fast performance"],
      },
      {
        title: "Workflow Automation",
        desc: "I remove repetitive manual work with reliable n8n & API automations.",
        points: ["Save 20+ hours / month", "Zero manual errors"],
      },
      {
        title: "AI-Powered Solutions",
        desc: "Smart AI integrations that cut costs and boost efficiency.",
        points: ["Reduce operating costs", "Smarter, faster decisions"],
      },
    ],
    stats: [
      { value: "20+", label: "Projects delivered" },
      { value: "100%", label: "Custom solutions" },
      { value: "20h+", label: "Saved monthly" },
      { value: "5★", label: "Client satisfaction" },
    ],
    whyHeadingPre: "Why work",
    whyHeadingHi: "with me",
    whyDesc:
      "More than a developer — a results-driven partner focused on your growth.",
    reasons: [
      {
        title: "Problem-Solving Mindset",
        desc: "I start with your business challenge, not the tech.",
      },
      {
        title: "Business-First Approach",
        desc: "I speak outcomes — revenue, time saved, efficiency.",
      },
      {
        title: "Measurable Results",
        desc: "Faster processes, lower costs, higher conversions.",
      },
      {
        title: "Long-Term Partnership",
        desc: "A reliable partner invested in your growth beyond launch.",
      },
    ],
    cta: "Let's grow your business",
  },
  problem: {
    reveal:
      "I turn slow, manual processes into fast websites and reliable automations that save time and grow your business.",
    badge: "Problem → Solution",
    headingPre: "I turn business friction into",
    headingHi: "working systems",
    problemsTitle: "Client Problems",
    solutionsTitle: "My Solutions",
    problems: [
      { text: "Manual repetitive tasks", sub: "Hours lost on work that could run itself" },
      { text: "Outdated, slow websites", sub: "Poor performance hurts trust and sales" },
      { text: "No automation in workflows", sub: "Disconnected tools and manual hand-offs" },
      { text: "Loss of time and customers", sub: "Inefficiency quietly drains revenue" },
    ],
    solutions: [
      { text: "Automated workflows", sub: "Reliable processes built with n8n & APIs" },
      { text: "Fast modern web apps", sub: "Optimized, scalable Next.js applications" },
      { text: "AI-powered integrations", sub: "Smart features that save time daily" },
      { text: "Process optimization", sub: "Streamlined operations end to end" },
    ],
  },
  projects: {
    badge: "Projects",
    headingPre: "Real solutions,",
    headingHi: "real results",
    intro: "A selection of systems built to solve concrete business problems.",
    hint: "Scroll or drag to explore · click any project for full details.",
    viewDetails: "View details",
    problem: "Problem",
    solution: "Solution",
    result: "Result",
    viewDemo: "View Live Demo",
    items: [
      {
        name: "Hotel Reservation System",
        tagline: "Automated bookings with real-time availability.",
        problem: "Manual booking system causing double reservations and confusion.",
        solution:
          "Automated hotel reservation system with real-time availability control, admin dashboard, and email confirmation.",
        result: "No booking conflicts and a faster reservation process.",
      },
      {
        name: "Sports Hall Management System",
        tagline: "Members, subscriptions & attendance in one place.",
        problem: "Gym/sports hall had no structured system to manage members and subscriptions.",
        solution:
          "Full management system for members, subscriptions, attendance tracking, and an admin dashboard.",
        result: "Better organization and automated tracking of members.",
      },
      {
        name: "Orient AI Platform",
        tagline: "AI-powered study & career guidance.",
        problem: "Users struggle to get guidance on what to study or which career path to choose.",
        solution:
          "AI-powered platform that analyzes the user profile and suggests study paths, careers, and recommendations.",
        result: "Personalized guidance and smarter decision making.",
      },
      {
        name: "Event Management System",
        tagline: "Registrations, QR check-in & notifications.",
        problem: "Manual event organization with messy registrations and no automation.",
        solution:
          "Event platform with a registration system, QR check-in, and automated notifications.",
        result: "Smooth event organization and a faster check-in process.",
      },
    ],
  },
  skills: {
    badge: "Skills",
    headingPre: "The",
    headingHi: "stack",
    headingPost: "I build with",
  },
  contact: {
    heading: "Let's build something that works",
    intro:
      "Tell me about your project or the process you want to automate. I'll get back to you quickly.",
    emailLabel: "Email",
    whatsapp: "WhatsApp",
    whatsappSub: "Chat with me directly",
    sentTitle: "Message sent!",
    sentDesc: "Thanks for reaching out. I'll get back to you as soon as I can.",
    sendAnother: "Send another message",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project...",
    send: "Send Message",
    sending: "Sending…",
    errorGeneric: "Something went wrong.",
  },
  footer: {
    headline: "Let's build something great.",
    startProject: "Start a project",
    viewWork: "View my work",
    crafted: "Crafted with",
    by: "by",
    rights: "All rights reserved.",
  },
  story: {
    back: "Back to home",
    scroll: "Scroll to begin",
    panels: [
      {
        eyebrow: "01 — The spark",
        title: "It started with curiosity.",
        body: "I fell for code the moment I realized a few lines could replace hours of repetitive work. That curiosity turned into a craft.",
      },
      {
        eyebrow: "02 — The craft",
        title: "Building for the web.",
        body: "I learned to ship fast, scalable web apps with Next.js and React — interfaces that feel effortless and load in a blink.",
      },
      {
        eyebrow: "03 — The leverage",
        title: "Then came automation.",
        body: "With n8n, APIs, and a bit of AI, I started removing the manual work behind the scenes — saving teams hours every single week.",
      },
      {
        eyebrow: "04 — The approach",
        title: "Outcomes over output.",
        body: "I don't start with technology. I start with your bottleneck — then design the simplest system that removes it for good.",
      },
      {
        eyebrow: "05 — The next chapter",
        title: "Let's write yours.",
        body: "Whether it's a website that converts or a workflow that runs itself, I'd love to build the next part of your story.",
      },
    ],
    cta: "Start a project",
  },
} as const;

const fr: typeof en = {
  nav: {
    home: "Accueil",
    about: "À propos",
    solutions: "Solutions",
    projects: "Projets",
    skills: "Compétences",
    story: "Parcours",
    contact: "Contact",
  },
  hero: {
    available: "Disponible pour missions freelance & contrats",
    role: "Développeur Web & Spécialiste en Automatisation",
    tagline:
      "Je conçois des applications web rapides et évolutives, et j'automatise les processus métier grâce à l'IA et aux outils modernes.",
    viewWork: "Voir mes projets",
    contactMe: "Me contacter",
    stats: [
      { value: "20+", label: "Projets livrés" },
      { value: "100%", label: "Automatisation des flux" },
      { value: "5★", label: "Satisfaction client" },
    ],
    cardWeb: "Apps Web Modernes",
    cardAuto: "Automatisation",
    chipAi: "Intégrations propulsées par l'IA",
  },
  about: {
    badge: "Ce que je fais",
    headingPre: "Je crée des solutions digitales qui",
    headingHi: "font gagner du temps, réduisent les coûts,",
    headingPost: "et aident les entreprises à grandir.",
    intro:
      "J'aide les entreprises à remplacer le travail manuel et lent par des sites rapides, des automatisations intelligentes et l'IA — pour évoluer avec moins d'efforts.",
    services: [
      {
        title: "Des sites qui convertissent",
        desc: "Des sites rapides et soignés conçus pour transformer les visiteurs en clients.",
        points: ["UX orientée conversion", "Performances ultra-rapides"],
      },
      {
        title: "Automatisation des flux",
        desc: "J'élimine les tâches manuelles répétitives avec des automatisations n8n & API fiables.",
        points: ["20h+ économisées / mois", "Zéro erreur manuelle"],
      },
      {
        title: "Solutions propulsées par l'IA",
        desc: "Des intégrations IA intelligentes qui réduisent les coûts et boostent l'efficacité.",
        points: ["Réduire les coûts", "Décisions plus rapides"],
      },
    ],
    stats: [
      { value: "20+", label: "Projets livrés" },
      { value: "100%", label: "Solutions sur mesure" },
      { value: "20h+", label: "Économisées / mois" },
      { value: "5★", label: "Satisfaction client" },
    ],
    whyHeadingPre: "Pourquoi travailler",
    whyHeadingHi: "avec moi",
    whyDesc:
      "Plus qu'un développeur — un partenaire orienté résultats, dédié à votre croissance.",
    reasons: [
      {
        title: "Esprit orienté solutions",
        desc: "Je pars de votre enjeu métier, pas de la technologie.",
      },
      {
        title: "Approche orientée business",
        desc: "Je parle résultats — revenus, temps gagné, efficacité.",
      },
      {
        title: "Résultats mesurables",
        desc: "Processus plus rapides, coûts réduits, conversions accrues.",
      },
      {
        title: "Partenariat durable",
        desc: "Un partenaire fiable investi dans votre croissance après le lancement.",
      },
    ],
    cta: "Faisons grandir votre entreprise",
  },
  problem: {
    reveal:
      "Je transforme les processus lents et manuels en sites rapides et automatisations fiables qui font gagner du temps et développent votre activité.",
    badge: "Problème → Solution",
    headingPre: "Je transforme les frictions métier en",
    headingHi: "systèmes opérationnels",
    problemsTitle: "Problèmes clients",
    solutionsTitle: "Mes solutions",
    problems: [
      { text: "Tâches manuelles répétitives", sub: "Des heures perdues sur du travail automatisable" },
      { text: "Sites lents et dépassés", sub: "Une mauvaise performance nuit à la confiance et aux ventes" },
      { text: "Aucune automatisation", sub: "Outils déconnectés et transferts manuels" },
      { text: "Perte de temps et de clients", sub: "L'inefficacité épuise discrètement les revenus" },
    ],
    solutions: [
      { text: "Flux automatisés", sub: "Processus fiables conçus avec n8n & API" },
      { text: "Apps web rapides et modernes", sub: "Applications Next.js optimisées et évolutives" },
      { text: "Intégrations propulsées par l'IA", sub: "Des fonctionnalités intelligentes qui font gagner du temps" },
      { text: "Optimisation des processus", sub: "Opérations rationalisées de bout en bout" },
    ],
  },
  projects: {
    badge: "Projets",
    headingPre: "De vraies solutions,",
    headingHi: "de vrais résultats",
    intro: "Une sélection de systèmes conçus pour résoudre des problèmes métier concrets.",
    hint: "Faites défiler ou glissez pour explorer · cliquez sur un projet pour les détails.",
    viewDetails: "Voir les détails",
    problem: "Problème",
    solution: "Solution",
    result: "Résultat",
    viewDemo: "Voir la démo",
    items: [
      {
        name: "Système de réservation d'hôtel",
        tagline: "Réservations automatisées avec disponibilité en temps réel.",
        problem: "Système de réservation manuel provoquant des doublons et de la confusion.",
        solution:
          "Système de réservation automatisé avec gestion des disponibilités en temps réel, tableau de bord admin et confirmation par email.",
        result: "Aucun conflit de réservation et un processus plus rapide.",
      },
      {
        name: "Gestion de salle de sport",
        tagline: "Membres, abonnements & présence au même endroit.",
        problem: "La salle n'avait aucun système structuré pour gérer membres et abonnements.",
        solution:
          "Système complet de gestion des membres, abonnements, suivi des présences et tableau de bord admin.",
        result: "Meilleure organisation et suivi automatisé des membres.",
      },
      {
        name: "Plateforme Orient AI",
        tagline: "Orientation études & carrière propulsée par l'IA.",
        problem: "Les utilisateurs peinent à choisir leurs études ou leur parcours professionnel.",
        solution:
          "Plateforme IA qui analyse le profil de l'utilisateur et suggère des parcours d'études, des carrières et des recommandations.",
        result: "Une orientation personnalisée et des décisions plus éclairées.",
      },
      {
        name: "Système de gestion d'événements",
        tagline: "Inscriptions, check-in QR & notifications.",
        problem: "Organisation d'événements manuelle, inscriptions désordonnées et aucune automatisation.",
        solution:
          "Plateforme d'événements avec système d'inscription, check-in par QR code et notifications automatisées.",
        result: "Une organisation fluide et un check-in plus rapide.",
      },
    ],
  },
  skills: {
    badge: "Compétences",
    headingPre: "La",
    headingHi: "stack",
    headingPost: "que j'utilise",
  },
  contact: {
    heading: "Construisons quelque chose qui fonctionne",
    intro:
      "Parlez-moi de votre projet ou du processus à automatiser. Je vous réponds rapidement.",
    emailLabel: "Email",
    whatsapp: "WhatsApp",
    whatsappSub: "Discutez directement avec moi",
    sentTitle: "Message envoyé !",
    sentDesc: "Merci de votre message. Je vous répondrai dès que possible.",
    sendAnother: "Envoyer un autre message",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@entreprise.com",
    message: "Message",
    messagePlaceholder: "Parlez-moi de votre projet...",
    send: "Envoyer le message",
    sending: "Envoi…",
    errorGeneric: "Une erreur est survenue.",
  },
  footer: {
    headline: "Créons quelque chose de grand.",
    startProject: "Démarrer un projet",
    viewWork: "Voir mes projets",
    crafted: "Conçu avec",
    by: "par",
    rights: "Tous droits réservés.",
  },
  story: {
    back: "Retour à l'accueil",
    scroll: "Faites défiler pour commencer",
    panels: [
      {
        eyebrow: "01 — L'étincelle",
        title: "Tout a commencé par la curiosité.",
        body: "Je suis tombé amoureux du code en réalisant que quelques lignes pouvaient remplacer des heures de travail répétitif. Cette curiosité est devenue un métier.",
      },
      {
        eyebrow: "02 — Le métier",
        title: "Construire pour le web.",
        body: "J'ai appris à livrer des apps web rapides et évolutives avec Next.js et React — des interfaces fluides qui se chargent en un clin d'œil.",
      },
      {
        eyebrow: "03 — Le levier",
        title: "Puis vint l'automatisation.",
        body: "Avec n8n, les API et un peu d'IA, j'ai commencé à supprimer le travail manuel en coulisses — faisant gagner des heures chaque semaine aux équipes.",
      },
      {
        eyebrow: "04 — L'approche",
        title: "Les résultats avant tout.",
        body: "Je ne pars pas de la technologie. Je pars de votre blocage — puis je conçois le système le plus simple pour l'éliminer durablement.",
      },
      {
        eyebrow: "05 — Le prochain chapitre",
        title: "Écrivons le vôtre.",
        body: "Qu'il s'agisse d'un site qui convertit ou d'un flux qui tourne tout seul, j'aimerais construire la prochaine partie de votre histoire.",
      },
    ],
    cta: "Démarrer un projet",
  },
};

const dictionaries = { en, fr };

export type Dictionary = typeof en;

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore saved preference on mount
  useEffect(() => {
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
    }
  }, []);

  // Persist + reflect on <html lang>
  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);
  const toggle = () => setLangState((p) => (p === "en" ? "fr" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggle, t: dictionaries[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
