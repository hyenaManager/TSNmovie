import { getServerSession } from "next-auth"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { authOptions } from "./app/api/auth/[...nextauth]/authOption";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req:NextRequestWithAuth) {
    // console.log("this is server session: ",session);
    // const session = getServerSession(authOptions);
    
    if (req.nextUrl.pathname.startsWith("/adminSite") && req.nextauth.token?.role !== "ADMIN"){
        return NextResponse.rewrite(new URL("/denied",req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {matcher : ["/adminSite","/clips","/streamers","/profile","/notifications"]}