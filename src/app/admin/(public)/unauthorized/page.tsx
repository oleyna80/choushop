import { signOut } from "@/auth";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm grid gap-6 text-center">
        <div>
          <h1 className="text-2xl font-black">Access Denied</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Your account does not have admin privileges. If you believe this is
            an error, contact the site owner.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-6 py-2.5 text-sm font-semibold text-white"
            type="submit"
          >
            Sign out
          </button>
        </form>

        <Link
          className="text-sm text-[var(--muted)] underline"
          href="/admin/login"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
