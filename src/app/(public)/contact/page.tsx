import { StaticPage } from "@/components/layout/static-page";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <StaticPage eyebrow="Support" title="Nous contacter">
      <p>
        Pour une question sur une commande, indique ton numero de commande et
        l&apos;email utilise au checkout.
      </p>
      <p>Email support a configurer avant go-live.</p>
    </StaticPage>
  );
}
