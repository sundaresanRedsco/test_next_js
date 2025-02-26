// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    access_token?: string;
    refresh_token?: string;
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    access_token?: string;
    refresh_token?: string;
  }
}
