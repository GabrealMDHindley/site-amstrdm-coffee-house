import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { business, locations } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with AMSTRDM Coffee House — Paso Robles and Atascadero, CA.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Get in touch"
        subtitle="Questions, private events, or just want to say hi — we'd love to hear from you."
        image="/subjects/atascadero/04.jpeg"
        alt="AMSTRDM Coffee House patio seating"
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.4fr] md:px-10">
          <ScrollReveal className="flex flex-col gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">Direct</p>
              <a
                href={`mailto:${business.email}`}
                className="mt-3 block font-display text-2xl text-ink hover:text-rust"
              >
                {business.email}
              </a>
            </div>

            {locations.map((loc) => (
              <div key={loc.slug}>
                <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">{loc.name}</p>
                <p className="mt-3 text-ink/75">
                  {loc.address.line1}
                  <br />
                  {loc.address.city}, {loc.address.state} {loc.address.zip}
                </p>
                {loc.phone && (
                  <a href={`tel:${loc.phone.replace(/[^\d]/g, "")}`} className="mt-1 block text-ink/75 hover:text-rust">
                    {loc.phone}
                  </a>
                )}
                <p className="mt-1 text-sm text-ink/50">{loc.hoursCoffee}</p>
              </div>
            ))}

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest2 text-rust">Follow</p>
              <div className="mt-3 flex gap-5">
                <a href={business.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-rust">
                  Instagram
                </a>
                <a href={business.social.facebook.url} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-rust">
                  Facebook
                </a>
                <a href={business.social.yelp.url} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-rust">
                  Yelp
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-3xl border border-ink/10 bg-white/40 p-8 md:p-12">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
