"use client";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import ProfileLink from "./profileSignIn";

export default function NavBar() {
  return (
    <>
      <nav className=" text-white z-50 flex b justify-between bg-none items-center mainNav fixed right-0 left-0 backdrop-blur-sm top-0">
        <div>
          <Link
            href={"/"}
            className=" text-2xl font-mono text-fuchsia-600 p-2 space-x-2"
          >
            YokePlay
          </Link>
        </div>

        <Link href={"/feed"} className={" p-3 mainNavLink "}>
          Feed
        </Link>
        <Link href={"/blink"} className={" p-3 mainNavLink "}>
          blink
        </Link>
        <Link href={"/streamers"} className={" p-3 mainNavLink "}>
          Pages
        </Link>
        <SessionProvider>
          <ProfileLink />
        </SessionProvider>
      </nav>
    </>
  );
}
