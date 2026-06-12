import type { MetadataRoute } from "next";

import { getProductSlugs } from "@/server/services/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "",
    "/shop",
    "/faq",
    "/contact",
    "/legal",
    "/privacy",
    "/terms",
    "/shipping-returns",
  ];

  const slugs = await getProductSlugs();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...slugs.map((slug) => ({
      url: `${baseUrl}/product/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
