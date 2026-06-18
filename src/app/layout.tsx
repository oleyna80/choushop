import type { Metadata } from "next";
import { Poppins, Pacifico } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "ChouShop Mystery Box",
    template: "%s | ChouShop"
  },
  description: "Mystery boxes cute avec demande sur le site et paiement via Vinted.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="fr">
      <body className={`${poppins.variable} ${pacifico.variable}`}>
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
