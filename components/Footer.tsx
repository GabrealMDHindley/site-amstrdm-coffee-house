import Image from "next/image";
import Link from "next/link";
import { business, locations } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo.png"
              alt="AMSTRDM Coffee House"
              width={160}
              height={47}
              className="h-9 w-auto"
              style={{ filter: "invert(1) brightness(2)" }}
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {business.tagline} Specialty coffee roasted by{" "}
              <a
                href={business.roaster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-brass/60 underline-offset-4 hover:text-brass"
              >
                {business.roaster.name}
              </a>
              , served daily in Paso Robles &amp; Atascadero.
            </p>
            <div className="mt-6 flex gap-5 text-xs font-semibold uppercase tracking-widest2 text-cream/70">
              <a href={business.social.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
                Instagram
              </a>
              <a href={business.social.facebook.url} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
                Facebook
              </a>
              <a href={business.social.yelp.url} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
                Yelp
              </a>
            </div>
          </div>

          {locations.map((loc) => (
            <div key={loc.slug}>
              <h3 className="font-display text-lg text-brass">{loc.name}</h3>
              <p className="mt-3 text-sm text-cream/70">
                {loc.address.line1}
                <br />
                {loc.address.city}, {loc.address.state} {loc.address.zip}
              </p>
              {loc.phone && (
                <a href={`tel:${loc.phone.replace(/[^\d]/g, "")}`} className="mt-2 block text-sm text-cream/70 hover:text-brass">
                  {loc.phone}
                </a>
              )}
              <p className="mt-3 text-xs uppercase tracking-widest2 text-cream/45">{loc.hoursCoffee}</p>
              <Link
                href={`/locations/${loc.slug}`}
                className="mt-3 inline-block text-xs font-semibold uppercase tracking-widest2 text-cream/80 underline decoration-rust underline-offset-4 hover:text-brass"
              >
                Visit page →
              </Link>
            </div>
          ))}

          <div>
            <h3 className="font-display text-lg text-brass">Visit</h3>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-cream/70">
              <Link href="/menu" className="hover:text-brass">
                Menu
              </Link>
              <Link href="/about" className="hover:text-brass">
                About
              </Link>
              <Link href="/contact" className="hover:text-brass">
                Contact
              </Link>
              <a href={business.orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
                Order Online
              </a>
            </nav>
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-cream/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} AMSTRDM Coffee House. All rights reserved.</p>
          <p>725 13th St, Paso Robles, CA · 6480 Palma Avenue, Atascadero, CA</p>
        </div>
      </div>
    </footer>
  );
}
