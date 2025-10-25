import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { username, password } = credentials;

        const user = await prisma.user.findFirst({
          where: { username },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return null;

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) (token.id = user.id), (token.username = user.username);
      return token;
    },
    async session({ session, token }: any) {
      if (token?.id)
        (session.user.id = token.id as string),
          (session.user.username = token.username as string);
      return session;
    },
  },
  secret: "secret",
  session: {
    strategy: "jwt",
  }
};

export default NextAuth(authOptions);
