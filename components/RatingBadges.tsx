import { ratingBadges } from "@/lib/site-data";
import ScrollReveal from "@/components/ScrollReveal";

export default function RatingBadges() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-brass">As rated by our guests</p>
        </ScrollReveal>
        <ScrollReveal stagger={0.12} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ratingBadges.map((b) => (
            <a
              key={b.platform}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-cream/10 px-8 py-10 text-center transition-colors hover:border-brass/50"
            >
              <span className="font-display text-5xl text-cream">{b.rating}</span>
              <span className="text-brass">★★★★★</span>
              <span className="mt-2 text-sm text-cream/60">
                {b.reviewCount} reviews on {b.platform}
              </span>
              <span className="mt-3 text-[11px] font-semibold uppercase tracking-widest2 text-cream/40 transition-colors group-hover:text-brass">
                View on {b.platform} →
              </span>
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
