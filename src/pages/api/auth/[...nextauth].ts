import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
].join(",");

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: { scope: scopes },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token as string; // Explicitly cast to string
        token.refreshToken = account.refresh_token as string; // Explicitly cast to string
        token.expiresAt = account.expires_at as number; // Explicitly cast to number
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Explicitly cast to string
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
