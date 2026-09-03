"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroFallback from "@/components/three/HeroFallback";
import { useIsMobile, useReducedMotion, useWebglSupported } from "@/lib/hooks";
import { business } from "@/lib/site-data";
import type { HeroProgressRef } from "@/components/three/HeroScene";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HeroProgressRef>({ current: 0 });
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebglSupported();
  const isMobile = useIsMobile();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current.children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.3 }
        );
      }

      if (!reducedMotion && sectionRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            progressRef.current.current = self.progress;
          },
        });

        gsap.to(copyRef.current, {
          opacity: 0,
          y: -40,
          ease: "power2.in",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "35% top",
            scrub: 1,
          },
        });

        return () => st.kill();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const showScene = webglSupported !== false;

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {showScene ? (
          webglSupported === null ? (
            <HeroFallback />
          ) : (
            <HeroScene progressRef={progressRef.current} reducedMotion={reducedMotion} isMobile={isMobile} />
          )
        ) : (
          <HeroFallback />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40" />

      <div
        ref={copyRef}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-24 md:justify-center md:px-10 md:pb-0"
      >
        <p className="text-xs font-semibold uppercase tracking-widest2 text-brass">
          Paso Robles &amp; Atascadero, California
        </p>
        <h1 className="mt-4 font-display text-[3.1rem] leading-[0.98] text-cream text-balance md:text-[6.5rem] lg:text-[7.5rem]">
          Coffee,
          <br />
          poured with
          <br />
          intention.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
          {business.description}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={business.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-rust px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-[1.03] hover:bg-rustDark"
          >
            Order Online
          </a>
          <Link
            href="/menu"
            className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream transition-colors hover:border-brass hover:text-brass"
          >
            View Menu
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 md:flex">
        <span className="text-[10px] font-semibold uppercase tracking-widest2">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-cream/40" />
      </div>
    </section>
  );
}
