import { sampleProducts } from "@/features/catalog/sample-products";
import { HomeCollectionsSection } from "@/features/home/home-collections-section";
import { HomeExperienceSection } from "@/features/home/home-experience-section";
import { HomeFeaturedProductsSection } from "@/features/home/home-featured-products-section";
import { HomeFinalCta } from "@/features/home/home-final-cta";
import { HomeHero } from "@/features/home/home-hero";

export function HomePageView() {
  const featuredProducts = sampleProducts.filter((product) => product.featured);
  const heroProduct = featuredProducts[0] ?? sampleProducts[0];
  const otherFeatured = featuredProducts.slice(1);
  const secondaryProducts = otherFeatured.slice(0, 2);
  const spotlightProduct = featuredProducts.at(-1) ?? heroProduct;

  return (
    <>
      <HomeHero
        heroProduct={heroProduct}
        secondaryProducts={secondaryProducts}
      />
      <HomeCollectionsSection />
      <HomeFeaturedProductsSection products={featuredProducts.slice(0, 3)} />
      <HomeExperienceSection spotlightProduct={spotlightProduct} />
      <HomeFinalCta />
    </>
  );
}
