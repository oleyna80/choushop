import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "ChouShop Mystery Box",
    template: "%s | ChouShop"
  },
  description: "Mystery boxes cute et soigneusement preparees en France.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${sora.variable} ${inter.variable}`}>
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
