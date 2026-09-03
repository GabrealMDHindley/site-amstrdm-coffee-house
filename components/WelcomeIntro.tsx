import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { business } from "@/lib/site-data";

export default function WelcomeIntro() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        <ScrollReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/subjects/paso-robles/02.jpeg"
            alt="AMSTRDM Coffee House front doors, Paso Robles"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </ScrollReveal>
        <ScrollReveal className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">{business.tagline}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-6xl">
            Welcome to AMSTRDM
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/70 md:text-lg">
            Step into AMSTRDM Coffee House in downtown Paso Robles &amp; Atascadero,
            CA, where a warm, welcoming atmosphere meets expertly crafted coffee and
            delicious morning fare. Our baristas proudly serve specialty coffee drinks
            made with small-batch roasts from{" "}
            <a
              href={business.roaster.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-rust underline-offset-4 hover:text-rust"
            >
              Paso Robles Coffee Co.
            </a>
            , delivering rich, fresh flavors in every cup.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
            Pair your favorite brew with our selection of fresh, locally baked
            pastries, breakfast sandwiches, and seasonal menu items. Whether you&apos;re
            starting your day or meeting up with friends, AMSTRDM offers the perfect
            blend of community, comfort, and quality in the heart of Paso Robles wine
            country.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
