import type { Metadata } from "next";

import { CandyCartPage } from "@/features/candy-cloud/cart-page";

export const metadata: Metadata = {
  title: "Panier"
};

export default function Page() {
  return <CandyCartPage />;
}
