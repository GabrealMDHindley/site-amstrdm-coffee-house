import ScrollReveal from "@/components/ScrollReveal";
import { business } from "@/lib/site-data";

export default function CTABanner() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">Skip the line</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink text-balance md:text-6xl">
            Your order, ready when you walk in.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink/65 md:text-lg">
            Order ahead online for pickup at either location — Paso Robles or
            Atascadero.
          </p>
          <a
            href={business.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-block rounded-full bg-rust px-9 py-4 text-sm font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105 hover:bg-rustDark"
          >
            Order Online
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
