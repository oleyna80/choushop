import type { MetadataRoute } from "next";

import { sampleProducts } from "@/features/catalog/sample-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "",
    "/shop",
    "/faq",
    "/contact",
    "/legal",
    "/privacy",
    "/terms",
    "/shipping-returns"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...sampleProducts.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
