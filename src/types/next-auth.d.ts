import type { DefaultSession } from "next-auth";

import type { AdminRole } from "@/types/api/auth";

type SessionUserDetails = {
  id?: string;
  role?: AdminRole;
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"] & SessionUserDetails;
  }

  interface User {
    accessToken?: string;
    role?: AdminRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: AdminRole;
  }
}

declare module "@auth/core/types" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
    role?: AdminRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    role?: AdminRole;
  }
}
