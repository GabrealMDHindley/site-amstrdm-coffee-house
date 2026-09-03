"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="relative flex h-[62svh] min-h-[420px] w-full items-end overflow-hidden bg-ink">
      <div ref={imgRef} className="absolute inset-0 -top-[8%] h-[116%]">
        <Image src={image} alt={alt} fill priority className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 md:px-10 md:pb-20">
        <p className="text-xs font-semibold uppercase tracking-widest2 text-brass">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] text-cream text-balance md:text-7xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-xl text-cream/75 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
