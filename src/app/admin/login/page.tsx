import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verify?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/admin");

  const { verify } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm grid gap-6">
        <div>
          <h1 className="text-2xl font-black">ChouShop Admin</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter your admin email to receive a magic link.
          </p>
        </div>

        {verify && (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
            Check your email — a magic link has been sent.
          </div>
        )}

        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="grid gap-4"
        >
          <label className="grid gap-1.5 text-sm">
            <span className="font-semibold">Email</span>
            <input
              className="rounded-md border border-[var(--line)] p-2.5 text-sm"
              name="email"
              placeholder="admin@choushop.fr"
              required
              type="email"
            />
          </label>
          <button
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-6 py-2.5 text-sm font-semibold text-white"
            type="submit"
          >
            Send magic link
          </button>
        </form>
      </div>
    </div>
  );
}
