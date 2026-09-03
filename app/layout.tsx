import type { Metadata } from "next";
import { Fraunces, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { business, locations } from "@/lib/site-data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amstrdm-coffee-house.vercel.app"),
  title: {
    default: "AMSTRDM Coffee House | Specialty Coffee & Brunch in Paso Robles & Atascadero",
    template: "%s | AMSTRDM Coffee House",
  },
  description: business.description,
  openGraph: {
    title: "AMSTRDM Coffee House",
    description: business.description,
    url: "https://amstrdm-coffee-house.vercel.app",
    siteName: "AMSTRDM Coffee House",
    images: ["/subjects/paso-robles/01.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMSTRDM Coffee House",
    description: business.description,
    images: ["/subjects/paso-robles/01.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: business.fullName,
    url: "https://amstrdm-coffee-house.vercel.app",
    image: "https://amstrdm-coffee-house.vercel.app/subjects/paso-robles/01.jpg",
    logo: "https://amstrdm-coffee-house.vercel.app/brand/logo.png",
    servesCuisine: "Coffee, Brunch, Breakfast",
    email: business.email,
    sameAs: [business.social.instagram.url, business.social.facebook.url, business.social.yelp.url],
    department: locations.map((loc) => ({
      "@type": "CafeOrCoffeeShop",
      name: `AMSTRDM Coffee House — ${loc.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address.line1,
        addressLocality: loc.address.city,
        addressRegion: loc.address.state,
        postalCode: loc.address.zip,
        addressCountry: "US",
      },
      telephone: loc.phone,
      openingHours: "Mo-Su 07:00-16:00",
      ...(loc.slug === "paso-robles"
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              reviewCount: "697",
            },
          }
        : {}),
    })),
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${libreFranklin.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
