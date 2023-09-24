
import NextAuth, { Account, DefaultSession, Profile, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";

import prisma from "../../../../../prisma/client";

declare module 'next-auth' {
  interface Session {
    user: {
      id:number
    } & DefaultSession["user"]
  }
}

type userProp = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const handler = NextAuth(
  
  {adapter: PrismaAdapter(prisma),
    providers: [
 
  // GoogleProvider({
  //   clientId: process.env.GOOGLE_CLIENT_ID ,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   authorization: {
  //     params: {
  //         prompt: "consent",
  //         access_type: "offline",
  //         response_type: "code"
  //     }
  // },
  // async profile(profile) {

  //     return {
  //         id: profile.sub,
  //         name: profile.name,
  //         firstname: profile.given_name,
  //         lastname: profile.family_name,
  //         email: profile.email,
  //         image: profile.picture,
  //     }
  // },
  // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const fetchUser = await prisma.user.findUnique({
          where:{
            email:credentials?.email
          }
        })      
        console.log("this is Authentication and user is ",fetchUser);
        if ( fetchUser && (credentials?.password === fetchUser.password)) {
          // Any object returned will be saved in `user` property of the JWT
          // console.log("fetch userIs::::",fetchUser)
          alert("success signIn !!")
          return fetchUser
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,
  pages: {
    signIn : "signIn",
    signOut: "signIn"
  },
  callbacks: {
    session: async ({ session, token }) => {
      // console.log("this is toke",token)
      if (session?.user) {
        const getUser = await prisma.user.findUnique({
          where:{
            id:token.uid as any
          }
        })
        session.user.id = token.uid as number;
        session.user.name = getUser?.lastName
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

})

export { handler as GET, handler as POST }