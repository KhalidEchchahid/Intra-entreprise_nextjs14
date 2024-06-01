import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      //   id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await connectToDatabase();
          const userFound = await User.findOne({
            email: credentials?.email,
          });

          if (!userFound) throw new Error("Invalid Email");

          const passwordMatch = await bcrypt.compare(
            credentials?.password,
            userFound.password
          );

          if (!passwordMatch) throw new Error("Invalid Password");
          return userFound;
        } catch (error) {
          console.log("Error: ", error);
          throw new Error("failed to login");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u._id,
          role: u.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          name: token.name,
          role: token.role
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
