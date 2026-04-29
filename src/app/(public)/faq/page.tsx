import { StaticPage } from "@/components/layout/static-page";

export const metadata = {
  title: "FAQ"
};

export default function FaqPage() {
  return (
    <StaticPage eyebrow="Aide" title="Questions frequentes">
      <section>
        <h2 className="text-xl font-black text-[var(--foreground)]">
          La box est-elle vraiment une surprise ?
        </h2>
        <p className="mt-2">
          Oui. La fiche produit indique le theme, la valeur et quelques exemples,
          mais pas la selection exacte.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-black text-[var(--foreground)]">
          Quand la commande est-elle preparee ?
        </h2>
        <p className="mt-2">
          Les commandes payees sont preparees manuellement sous 1 a 3 jours
          ouvres.
        </p>
      </section>
    </StaticPage>
  );
}
