import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { locations } from "@/lib/site-data";

export default function LocationsSplit() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-widest2 text-brass">Two locations</p>
          <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-cream md:text-6xl">
            Find your AMSTRDM.
          </h2>
        </ScrollReveal>
      </div>

      <div className="mt-14 grid gap-6 px-6 md:mt-20 md:grid-cols-2 md:gap-8 md:px-10">
        {locations.map((loc, i) => (
          <ScrollReveal key={loc.slug} delay={i * 0.1}>
            <Link
              href={`/locations/${loc.slug}`}
              className="group relative flex h-[70vh] flex-col justify-end overflow-hidden rounded-2xl md:h-[78vh]"
            >
              <Image
                src={loc.heroImage}
                alt={`AMSTRDM Coffee House — ${loc.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="relative z-10 p-8 md:p-10">
                {loc.flagship && (
                  <span className="mb-3 inline-block rounded-full border border-brass/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-brass">
                    Flagship
                  </span>
                )}
                <h3 className="font-display text-4xl text-cream md:text-5xl">{loc.name}</h3>
                <p className="mt-3 max-w-sm text-sm text-cream/70">{loc.short}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest2 text-cream/50">
                  {loc.hoursCoffee}
                </p>
                <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-widest2 text-brass underline underline-offset-4">
                  Visit {loc.name} →
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
