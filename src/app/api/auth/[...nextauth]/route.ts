import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import type { DefaultSession } from 'next-auth';
import prisma from "../../../../../prisma/client";

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: number;
    };
  }
}

type userProp = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const handler = NextAuth({providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your-username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const allUsers = await prisma.user.findMany()      
        const filteredUser = allUsers.find((user:userProp)=>credentials?.username === user.name)
        // console.log("this is Authentication and user is ",filteredUser);
  
        if ( filteredUser && (credentials?.password === filteredUser.password)) {
          // Any object returned will be saved in `user` property of the JWT
          return filteredUser
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn : "signIn",
    signOut: "signIn"
  },
  callbacks: {
    session: async ({ session, token }) => {
      // console.log("this is toke",token)
      if (session?.user) {
        session.user.id = token.uid as number;
        // console.log(session.user.id)
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id ;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma)

})

export { handler as GET, handler as POST }