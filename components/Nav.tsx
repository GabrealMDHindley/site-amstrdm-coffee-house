"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/lib/site-data";

const links = [
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/locations/paso-robles", label: "Paso Robles" },
  { href: "/locations/atascadero", label: "Atascadero" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(23,19,16,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="relative z-10 flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt="AMSTRDM Coffee House"
            width={140}
            height={41}
            priority
            className={`h-7 w-auto transition-all duration-300 md:h-8 ${
              scrolled ? "" : "invert brightness-0"
            }`}
            style={{ filter: scrolled ? "none" : "invert(1) brightness(2)" }}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] font-medium uppercase tracking-widest2 transition-colors ${
                scrolled ? "text-ink/80 hover:text-rust" : "text-cream/90 hover:text-brass"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={business.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-rust px-5 py-2.5 text-[13px] font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-rustDark"
          >
            Order Online
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden`}
        >
          <span
            className={`h-[1.5px] w-6 transition-all ${scrolled || open ? "bg-ink" : "bg-cream"} ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 transition-all ${scrolled || open ? "bg-ink" : "bg-cream"} ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-0 flex flex-col items-center justify-center gap-8 bg-ink text-cream transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl"
          >
            {l.label}
          </Link>
        ))}
        <a
          href={business.orderOnlineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 rounded-full bg-rust px-8 py-3 text-sm font-semibold uppercase tracking-widest2 text-cream"
        >
          Order Online
        </a>
      </div>
    </header>
  );
}
