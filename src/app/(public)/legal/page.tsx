import { StaticPage } from "@/components/layout/static-page";

export const metadata = {
  title: "Mentions legales"
};

export default function LegalPage() {
  return (
    <StaticPage eyebrow="Go-live blocker" title="Mentions legales">
      <p>
        Contenu legal final a fournir avant tout paiement reel: identite du
        vendeur, adresse, SIRET le cas echeant, contact et hebergeur.
      </p>
    </StaticPage>
  );
}
