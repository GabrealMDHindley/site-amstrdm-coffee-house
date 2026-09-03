import type { MetadataRoute } from "next";
import { locations } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://amstrdm-coffee-house.vercel.app";
  const staticRoutes = ["", "/about", "/menu", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const locationRoutes = locations.map((loc) => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...locationRoutes];
}
