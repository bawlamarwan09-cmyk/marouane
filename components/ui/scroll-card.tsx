"use client";

import React from "react";

export interface StackCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  linkLabel?: string;
  /** Tailwind gradient classes, e.g. "from-navy-700 to-blue-600" */
  accent?: string;
}

const rotations = ["rotate-3", "-rotate-2", "rotate-2", "-rotate-3"];

/**
 * Sticky "stacking cards" scroll effect (adapted from scroll-card.tsx).
 * Each card sticks to the viewport center and stacks over the previous one
 * as you scroll. Themed for a light UI. Pure CSS sticky — no JS scroll math.
 *
 * NOTE: No ancestor may have `overflow: hidden`, or sticky positioning breaks.
 */
export default function ScrollStackCards({
  cards,
  sideTitle,
}: {
  cards: StackCard[];
  sideTitle?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-10 px-4">
        <div className="grid w-full gap-2 lg:w-auto">
          {cards.map((card, i) => (
            <figure
              key={i}
              className="sticky top-0 grid h-screen place-content-center"
            >
              <article
                className={`relative mx-auto h-72 w-full max-w-[34rem] ${
                  rotations[i % rotations.length]
                } overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-8 shadow-glow backdrop-blur-xl`}
              >
                {/* Accent glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${
                    card.accent ?? "from-navy-700 to-teal-500"
                  } opacity-20 blur-2xl`}
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-4">
                    {card.icon && (
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                          card.accent ?? "from-navy-700 to-teal-500"
                        } text-white shadow-card`}
                      >
                        {card.icon}
                      </span>
                    )}
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>

                  {card.link && (
                    <a
                      href={card.link}
                      target={card.link.startsWith("#") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="mt-auto w-fit rounded-full bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                    >
                      {card.linkLabel ?? "Learn more"}
                    </a>
                  )}
                </div>
              </article>
            </figure>
          ))}
        </div>

        {sideTitle && (
          <div className="sticky top-0 hidden h-screen place-content-center lg:grid">
            {sideTitle}
          </div>
        )}
      </div>
    </div>
  );
}
