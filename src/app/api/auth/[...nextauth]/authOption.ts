import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter"

import prisma from "../../../../../prisma/client";


export const authOptions:NextAuthOptions = {adapter: PrismaAdapter(prisma),
    providers: [
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
    session: async ({ session, token }:{session:any,token:any}) => {
      if(token){
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image
        session.user.role = token.role
      }
      return session
    },
    jwt: async ({ user, token }:{user:any,token:any}) => {
      const dbUser = await prisma.user.findFirst({
        where:{
          email:token.email
        },
      })
      //if the user doesnt exist
      if (!dbUser){
        token.id = user.id
        return token
      }
      return {
        id:dbUser.id,
        name:`${dbUser.firstName} ${dbUser.lastName}`,
        email:dbUser.email,
        image:dbUser.image,
        role:dbUser.role
      }
    },
  },
  session: {
    strategy: 'jwt',
  },

}