
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter"

import prisma from "../../../../../prisma/client";
import { authOptions } from "./authOption";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }