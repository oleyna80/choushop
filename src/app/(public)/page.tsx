import { mapProductsToStorefront } from "@/features/catalog/catalog-mapper";
import { HomePageView } from "@/features/home";
import { getFeaturedProducts } from "@/server/services/catalog";

export default async function HomePage() {
  const products = await getFeaturedProducts();
  return <HomePageView products={mapProductsToStorefront(products)} />;
}
