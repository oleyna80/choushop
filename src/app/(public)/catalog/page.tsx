import type { Metadata } from "next";

import { CatalogPage } from "@/features/candy-cloud/candy-pages";

export const metadata: Metadata = {
  title: "Catalogue"
};

export default function Page() {
  return <CatalogPage />;
}
