import { StaticPage } from "@/components/layout/static-page";

export const metadata = {
  title: "CGV"
};

export default function TermsPage() {
  return (
    <StaticPage eyebrow="Go-live blocker" title="Conditions generales de vente">
      <p>
        Les CGV finales doivent etre validees avant activation des paiements
        reels. Le checkout exige leur acceptation explicite.
      </p>
    </StaticPage>
  );
}
