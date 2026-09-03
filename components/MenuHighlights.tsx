import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const highlights = [
  {
    name: "Eggs Benedict",
    price: "18",
    description: "Black forest ham, spinach, sage hollandaise, french baguette",
    image: "/subjects/paso-robles/06.jpeg",
  },
  {
    name: "House Espresso",
    price: "4",
    description: "Small-batch roasts from Paso Robles Coffee Co., pulled to order",
    image: "/subjects/paso-robles/07.jpeg",
  },
  {
    name: "Mushroom Toast",
    price: "18",
    description: "Crimini, shiitake, oyster mushrooms, smashed avocado, poached egg",
    image: "/subjects/paso-robles/08.jpeg",
  },
  {
    name: "Caramel Apple French Toast",
    price: "18",
    description: "Sweet cream cheese, vanilla whip, crushed pecans",
    image: "/subjects/atascadero/06.jpeg",
  },
];

export default function MenuHighlights() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">AMSTRDM Favorites</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-ink md:text-6xl">
              Elevated café classics, made from scratch.
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-sm font-semibold uppercase tracking-widest2 text-ink underline decoration-rust underline-offset-4 hover:text-rust"
          >
            View Full Menu →
          </Link>
        </ScrollReveal>
      </div>

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-10">
        {highlights.map((item) => (
          <div
            key={item.name}
            className="group relative aspect-[3/4] w-[76vw] flex-shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[42vw] md:w-[26vw] lg:w-[23vw]"
          >
            <Image
              src={item.image}
              alt={`${item.name} at AMSTRDM Coffee House`}
              fill
              sizes="(max-width: 768px) 76vw, 24vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl text-cream">{item.name}</h3>
                <span className="text-brass">${item.price}</span>
              </div>
              <p className="mt-2 text-sm leading-snug text-cream/70">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
