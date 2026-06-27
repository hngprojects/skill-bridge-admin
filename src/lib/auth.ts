import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import type { AdminRole } from "@/types/api/auth";

const ADMIN_ROLES: AdminRole[] = ["super_admin", "admin", "reviewer"];

function optionalString(value: unknown): string | undefined {
  if (value === "" || value === "undefined" || value == null) return undefined;
  return typeof value === "string" ? value : undefined;
}

function sessionUserFromCredentials(rawCredentials: unknown) {
  if (typeof rawCredentials !== "object" || rawCredentials === null) {
    return null;
  }

  const credentials = rawCredentials as Record<string, unknown>;
  if (credentials.sessionUser !== "true") return null;

  const id = credentials.userId;
  const email = credentials.email;
  const name = credentials.name;
  const role = credentials.role;
  const accessToken = optionalString(credentials.accessToken);
  const image = optionalString(credentials.image);

  if (
    typeof id !== "string" ||
    typeof email !== "string" ||
    typeof name !== "string" ||
    !ADMIN_ROLES.includes(role as AdminRole)
  ) {
    return null;
  }

  return {
    id,
    email,
    name,
    image,
    role: role as AdminRole,
    accessToken,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        sessionUser: { label: "Session user", type: "text" },
        userId: { label: "User id", type: "text" },
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
        image: { label: "Image", type: "text" },
        role: { label: "Role", type: "text" },
        accessToken: { label: "Access token", type: "text" },
      },
      authorize(rawCredentials) {
        return sessionUserFromCredentials(rawCredentials);
      },
    }),
  ],
  secret:
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV === "development" ? "dev-auth-secret" : undefined),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const credentialUser = user as
        | {
            accessToken?: string;
            role?: AdminRole;
            email?: string;
            name?: string;
          }
        | undefined;

      if (account?.provider === "credentials" && credentialUser?.accessToken) {
        token.accessToken = credentialUser.accessToken;
      }

      if (account?.provider === "credentials" && credentialUser) {
        token.role = credentialUser.role;
        if (credentialUser.email) token.email = credentialUser.email;
        if (credentialUser.name) token.name = credentialUser.name;
      }

      return token;
    },
    async session({ session, token }) {
      const sessionUser = session.user as typeof session.user & {
        id?: string;
        role?: AdminRole;
      };

      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;

      if (typeof token.sub === "string") {
        sessionUser.id = token.sub;
      }
      if (typeof token.email === "string") {
        sessionUser.email = token.email;
      }
      if (typeof token.name === "string") {
        sessionUser.name = token.name;
      }
      sessionUser.role = token.role as AdminRole | undefined;

      return session;
    },
  },
});
