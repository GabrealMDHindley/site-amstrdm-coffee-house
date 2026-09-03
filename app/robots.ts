import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://site-amstrdm-coffee-house.vercel.app/sitemap.xml",
  };
}
