import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import RatingBadges from "@/components/RatingBadges";
import { business, locations } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind AMSTRDM Coffee House — owned by Corey Jordan and Kate Smith, roasting Paso Robles Coffee Co. beans in downtown Paso Robles and Atascadero, CA.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Simplicity, elevated."
        subtitle="A neighborhood coffee spot, reborn — and still rooted in the heart of Paso Robles."
        image="/subjects/paso-robles/03.jpeg"
        alt="AMSTRDM Coffee House storefront, downtown Paso Robles"
      />

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10">
          <ScrollReveal className="order-2 flex flex-col justify-center md:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">Origins</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">
              A history dating back to the mid-2000s.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70 md:text-lg">
              Rooted in the heart of Paso Robles, CA, AMSTRDM Coffee House has a
              history dating back to the mid-2000s when it first opened its doors as a
              neighborhood coffee spot. After a few evolutions, the coffee shop was
              reborn under the ownership of{" "}
              <strong className="font-semibold text-ink">Corey Jordan and Kate Smith</strong>,
              who brought new energy and a fresh vision to the beloved space.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
              Today, AMSTRDM is known for its warm, welcoming atmosphere, expertly
              prepared coffee and tea selections featuring roasts from{" "}
              <a
                href={business.roaster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-rust underline-offset-4 hover:text-rust"
              >
                Paso Robles Coffee Co.
              </a>
              , and a delicious menu of morning bites. A favorite gathering place for
              locals and visitors alike, AMSTRDM Coffee House invites you to relax,
              connect, and experience the best of Paso Robles hospitality, one cup at
              a time.
            </p>
            <p className="mt-6 text-sm text-ink/50">
              Look for the &ldquo;Kate + Corey&rdquo; salad bowl on our menu — named
              for the two people who brought AMSTRDM back to life.
            </p>
          </ScrollReveal>
          <ScrollReveal className="order-1 relative aspect-[4/5] overflow-hidden rounded-2xl md:order-2">
            <Image
              src="/subjects/paso-robles/02.jpeg"
              alt="AMSTRDM Coffee House | Piano Lounge door signage, Paso Robles"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-stone py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">Our locations</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-ink md:text-5xl">
              Downtown Paso Robles, and now Atascadero.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            {locations.map((loc, i) => (
              <ScrollReveal key={loc.slug} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={loc.heroImage}
                    alt={`AMSTRDM Coffee House — ${loc.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink">{loc.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{loc.description}</p>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest2 text-rust underline underline-offset-4"
                >
                  Visit {loc.name} →
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <RatingBadges />
    </>
  );
}
