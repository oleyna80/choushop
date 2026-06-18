import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/db/prisma";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM ?? "noreply@choushop.fr",
      apiKey: process.env.RESEND_API_KEY,
    }),
  ],
  pages: {
    signIn: "/admin/login",
    verifyRequest: "/admin/login?verify=1",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;
      // Allowlist: grant admin role to first-time sign-in, promote existing non-admin
      if (ADMIN_EMAILS.includes(email)) {
        const dbUser = await prisma.user.findUnique({
          where: { email },
          select: { role: true },
        });
        if (!dbUser) return true; // first sign-in, role comes from DB default
        if (dbUser.role !== "OWNER" && dbUser.role !== "ADMIN") {
          await prisma.user.update({ where: { email }, data: { role: "ADMIN" } });
        }
        return true;
      }
      // Non-allowlisted: must already have admin role in DB
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { role: true },
      });
      return dbUser?.role === "OWNER" || dbUser?.role === "ADMIN";
    },
    async session({ session, user }) {
      const u = user as { role?: string };
      // Fail closed: if role is missing or not admin, deny
      const role = u.role;
      if (!role || (role !== "OWNER" && role !== "ADMIN")) {
        return { ...session, user: { ...session.user, role: null } };
      }
      return { ...session, user: { ...session.user, role } };
    },
  },
  trustHost: true,
});
