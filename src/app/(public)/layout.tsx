import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden pb-24 md:pb-0">{children}</main>
      <SiteFooter />
      <MobileTabBar />
    </>
  );
}
