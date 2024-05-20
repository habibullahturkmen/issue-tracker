import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github"
import NextAuth from "next-auth"

import prisma from "../../../../../prisma/client"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
