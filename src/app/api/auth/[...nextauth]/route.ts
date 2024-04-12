import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import { authOptions } from "@/lib/auth";

const handler = NextAuth({
  ...authOptions,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
