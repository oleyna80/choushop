import type { MetadataRoute } from "next";

import { candyProducts } from "@/features/candy-cloud/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "",
    "/catalog",
    "/cart",
    "/order",
    "/order/success",
    "/design",
    "/faq",
    "/contact",
    "/legal",
    "/privacy",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...candyProducts.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
