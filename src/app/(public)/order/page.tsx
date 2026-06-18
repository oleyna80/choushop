import type { Metadata } from "next";

import { OrderRequestPage } from "@/features/candy-cloud/order-page";

export const metadata: Metadata = {
  title: "Demande"
};

export default function Page() {
  return <OrderRequestPage />;
}
