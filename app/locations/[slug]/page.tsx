import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { business, locations } from "@/lib/site-data";

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: `AMSTRDM Coffee House — ${loc.name}`,
    description: loc.description,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const other = locations.find((l) => l.slug !== loc.slug)!;

  return (
    <>
      <PageHeader
        eyebrow={loc.flagship ? "Flagship location" : "Now open"}
        title={loc.name}
        subtitle={loc.short}
        image={loc.heroImage}
        alt={`AMSTRDM Coffee House — ${loc.name}`}
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[1fr_1.3fr] md:gap-16 md:px-10">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">Visit us</p>
            <h2 className="mt-4 font-display text-3xl text-ink">{loc.address.line1}</h2>
            <p className="text-ink/60">
              {loc.address.city}, {loc.address.state} {loc.address.zip}
            </p>

            <div className="mt-8 space-y-4 border-t border-ink/10 pt-8 text-sm">
              <div>
                <p className="font-semibold uppercase tracking-widest2 text-ink/40">Coffee</p>
                <p className="mt-1 text-ink/75">{loc.hoursCoffee}</p>
              </div>
              {loc.hoursKitchen && (
                <div>
                  <p className="font-semibold uppercase tracking-widest2 text-ink/40">Kitchen</p>
                  <p className="mt-1 text-ink/75">{loc.hoursKitchen}</p>
                </div>
              )}
              {loc.phone && (
                <div>
                  <p className="font-semibold uppercase tracking-widest2 text-ink/40">Phone</p>
                  <a href={`tel:${loc.phone.replace(/[^\d]/g, "")}`} className="mt-1 block text-ink/75 hover:text-rust">
                    {loc.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-ink/80"
              >
                Get Directions
              </a>
              <a
                href={business.orderOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-ink transition-colors hover:border-rust hover:text-rust"
              >
                Order Online
              </a>
            </div>

            <Link
              href={`/locations/${other.slug}`}
              className="mt-10 inline-block text-xs font-semibold uppercase tracking-widest2 text-ink/50 underline decoration-brass underline-offset-4 hover:text-rust"
            >
              Also visit our {other.name} location →
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-base leading-relaxed text-ink/70 md:text-lg">{loc.description}</p>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-3 px-6 md:mt-24 md:grid-cols-4 md:gap-4 md:px-10">
          {loc.gallery.map((src, i) => (
            <ScrollReveal
              key={src}
              delay={i * 0.05}
              className={`relative overflow-hidden rounded-xl ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
            >
              <Image
                src={src}
                alt={`AMSTRDM Coffee House ${loc.name} — photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
