import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Admin | ChouShop",
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell userEmail={session.user?.email ?? null}>
      {children}
    </AdminShell>
  );
}
