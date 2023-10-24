import { User } from "@prisma/client"
import {UserRole} from "@prisma/client"
import "next-auth/jwt"

declare module 'next-auth/jwt' {
    interface JWT {
      id:string,
      role:UserRole
    }
  }

declare module 'next-auth' {
    interface Session {
      user: User & {
        id:string,
        role:UserRole
      }
    }
  }