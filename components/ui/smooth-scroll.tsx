"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single global Lenis smooth-scroll root.
 * Synced with GSAP ScrollTrigger so scroll-driven animations (e.g. the
 * cinematic footer) stay in step with Lenis' interpolated scroll position.
 */
function LenisGsapSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
