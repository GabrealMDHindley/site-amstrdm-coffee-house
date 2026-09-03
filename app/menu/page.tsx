import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MenuCategoryBlock from "@/components/MenuCategoryBlock";
import { menu, business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The AMSTRDM Coffee House menu — specialty coffee, tea, elevated breakfast, brunch, lunch, and kids' menu. Sourced seasonally and locally.",
};

const categories = menu.map((c) => ({ id: c.id, title: c.title }));

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Coffee | Brunch"
        title="Our Menu"
        subtitle="Expertly crafted coffee drinks, fresh pastries, and elevated breakfast — made using premium beans from Paso Robles Coffee Co. and local ingredients whenever possible."
        image="/brand/menu-graphic.jpg"
        alt="AMSTRDM Coffee House printed menu"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="sticky top-16 z-30 -mx-6 mb-10 md:mx-0">
            <div className="relative bg-cream/95 backdrop-blur">
              <div className="no-scrollbar flex gap-6 overflow-x-auto px-6 py-4 md:px-0">
                {categories.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest2 text-ink/60 hover:text-rust"
                  >
                    {c.title}
                  </a>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream/95 to-transparent md:hidden" />
            </div>
          </div>

          {menu.map((category) => (
            <MenuCategoryBlock key={category.id} category={category} />
          ))}

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-ink/10 pt-12 text-sm text-ink/60 md:flex-row md:items-center md:justify-between">
            <p>We source seasonally &amp; locally from farmers we know and trust.</p>
            <a
              href={business.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-rust px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-rustDark"
            >
              Order Online
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
