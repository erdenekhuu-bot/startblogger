import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
            
                return null
                // if (!credentials) return null;

                // const { username, password } = credentials;

                // const user = await prisma.user.findUnique({
                //     where: { username },
                // });

                // if (!user) return null;

                // const isValid = await bcrypt.compare(password, user.password);

                // if (!isValid) return null;

                // return {
                //     id: user.id.toString(),
                //     name: user.name,
                //     email: user.email,
                // };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            // if (token?.id) session.user.id = token.id as string;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};