import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <AdminShell userEmail={session?.user?.email ?? null}>
      {children}
    </AdminShell>
  );
}

