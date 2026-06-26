import type { DefaultSession } from "next-auth";

type SessionUserDetails = {
  id?: string;
  role?: "talent" | "employer" | "admin";
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"] & SessionUserDetails;
  }

  interface User {
    accessToken?: string;
    role?: SessionUserDetails["role"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: SessionUserDetails["role"];
  }
}

declare module "@auth/core/types" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
    role?: SessionUserDetails["role"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    role?: SessionUserDetails["role"];
  }
}
