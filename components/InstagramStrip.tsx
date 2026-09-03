import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { business } from "@/lib/site-data";

const shots = [
  "/subjects/paso-robles/06.jpeg",
  "/subjects/paso-robles/07.jpeg",
  "/subjects/atascadero/06.jpeg",
  "/subjects/paso-robles/08.jpeg",
  "/subjects/atascadero/07.jpeg",
];

export default function InstagramStrip() {
  return (
    <section className="bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-brass">Follow along</p>
            <h2 className="mt-4 font-display text-3xl text-cream md:text-5xl">{business.social.instagram.handle}</h2>
          </div>
          <a
            href={business.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold uppercase tracking-widest2 text-cream underline decoration-brass underline-offset-4 hover:text-brass"
          >
            View on Instagram →
          </a>
        </ScrollReveal>

        <ScrollReveal stagger={0.08} className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
          {shots.map((src, i) => (
            <a
              key={i}
              href={business.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt="AMSTRDM Coffee House on Instagram"
                fill
                sizes="20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
