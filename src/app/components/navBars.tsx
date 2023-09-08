"use client";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();
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
        <Link
          href={"/profile"}
          className=" flex justify-center p-3 mainNavLink items-center"
        >
          {session ? (
            <>
              <span className=" text-fuchsia-400 text-lg p-1">
                {session?.user?.name}
              </span>
              <img
                src="/bb.png"
                className=" w-[40px] h-[40px] rounded-full object-cover"
              />
            </>
          ) : (
            <span className=" text-lg text-white">Login</span>
          )}
        </Link>
      </nav>
    </>
  );
}
