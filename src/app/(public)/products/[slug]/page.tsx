import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CandyProductDetailPage } from "@/features/candy-cloud/product-detail-page";
import { candyProducts, getCandyProduct } from "@/features/candy-cloud/products";

export function generateStaticParams() {
  return candyProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getCandyProduct(slug);
  return {
    title: product ? product.name : "ChouShop"
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getCandyProduct(slug);
  if (!product) notFound();
  return <CandyProductDetailPage product={product} />;
}
