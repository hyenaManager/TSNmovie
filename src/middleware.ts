import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req:NextRequestWithAuth) {
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

export const config = {matcher : ["/adminSite"]}