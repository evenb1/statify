import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken to Session
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
