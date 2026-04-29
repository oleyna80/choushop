import { StaticPage } from "@/components/layout/static-page";

export const metadata = {
  title: "Livraison & retours"
};

export default function ShippingReturnsPage() {
  return (
    <StaticPage eyebrow="Livraison" title="Livraison & retours">
      <p>
        France standard et France suivie sont prevues pour le MVP-0. Les tarifs
        finaux seront geres dans l&apos;administration.
      </p>
      <p>
        La politique de retour/remboursement finale est un blocker go-live avant
        tout paiement reel.
      </p>
    </StaticPage>
  );
}
