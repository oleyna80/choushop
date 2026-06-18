import type { Metadata } from "next";

import { CandyDesignPage } from "@/features/candy-cloud/design-page";

export const metadata: Metadata = {
  title: "Design system"
};

export default function Page() {
  return <CandyDesignPage />;
}
