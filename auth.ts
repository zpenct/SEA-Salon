import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        full_name: { label: "Full Name", type: "text" },
        phone_number: { label: "Phone Number", type: "text" },
        role: { label: "Role", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user) {
          console.log("Ternyata gak ada user");
          return null;
        }

        if (!(await bcrypt.compare(String(password), user.password))) {
          console.log("Password salah");
          return null;
        }

        const userData: any = {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          phone_number: user.phone_number,
        };

        return userData;
      },
    }),
  ],

  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
