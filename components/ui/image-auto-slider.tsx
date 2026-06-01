"use client";

import React from "react";

/**
 * Infinite, auto-scrolling marquee. Pass any React nodes as `slides` and they
 * will loop seamlessly. Hover pauses the animation. Adapted from the
 * image-auto-slider component to be theme-agnostic and reusable.
 */
export const ImageAutoSlider = ({
  slides,
  speed = 40,
  className = "",
}: {
  slides: React.ReactNode[];
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  className?: string;
}) => {
  // Duplicate slides for a seamless loop
  const duplicated = [...slides, ...slides];

  return (
    <>
      <style>{`
        @keyframes ias-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ias-track {
          animation: ias-scroll ${speed}s linear infinite;
          will-change: transform;
        }
        .ias-group:hover .ias-track {
          animation-play-state: paused;
        }
        .ias-mask {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>

      <div className={`ias-group w-full overflow-hidden ${className}`}>
        <div className="ias-mask w-full">
          <div className="ias-track flex w-max gap-6 py-2">
            {duplicated.map((node, index) => (
              <div key={index} className="flex-shrink-0">
                {node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageAutoSlider;
