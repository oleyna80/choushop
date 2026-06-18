import type { Metadata } from "next";

import { OrderSuccessPage } from "@/features/candy-cloud/success-page";

export const metadata: Metadata = {
  title: "Demande envoyee"
};

export default function Page() {
  return <OrderSuccessPage />;
}
