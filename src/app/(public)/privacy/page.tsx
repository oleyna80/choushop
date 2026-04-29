import { StaticPage } from "@/components/layout/static-page";

export const metadata = {
  title: "Confidentialite"
};

export default function PrivacyPage() {
  return (
    <StaticPage eyebrow="Go-live blocker" title="Politique de confidentialite">
      <p>
        Contenu RGPD final a fournir avant go-live: donnees collectees,
        finalites, durees de conservation, processeurs, droits utilisateur et
        contact.
      </p>
    </StaticPage>
  );
}
