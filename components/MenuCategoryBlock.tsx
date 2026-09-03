import ScrollReveal from "@/components/ScrollReveal";
import type { MenuCategory } from "@/lib/site-data";

export default function MenuCategoryBlock({ category }: { category: MenuCategory }) {
  return (
    <div id={category.id} className="scroll-mt-28 border-t border-ink/10 py-14 first:border-t-0 first:pt-0">
      <ScrollReveal className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-14">
        <div>
          <h2 className="font-display text-3xl text-ink md:sticky md:top-32">{category.title}</h2>
          {category.note && <p className="mt-3 text-xs leading-relaxed text-ink/50 md:sticky md:top-44">{category.note}</p>}
        </div>
        <ul className="flex flex-col divide-y divide-ink/8">
          {category.items.map((item) => (
            <li key={item.name} className="flex items-start justify-between gap-6 py-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-lg text-ink">{item.name}</h3>
                </div>
                {item.description && (
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/55">{item.description}</p>
                )}
                {item.addOns && (
                  <p className="mt-1 text-xs uppercase tracking-widest2 text-rust/80">{item.addOns.join(" · ")}</p>
                )}
              </div>
              <span className="whitespace-nowrap font-display text-lg text-rust">${item.price}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  );
}
