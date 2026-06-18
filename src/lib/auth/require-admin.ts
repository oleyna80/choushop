import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Require admin role (OWNER or ADMIN). Redirects to login if not authenticated,
 * or to 403 if authenticated but not admin. Returns session on success.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "OWNER" && role !== "ADMIN") {
    redirect("/admin/unauthorized");
  }
  return session;
}
