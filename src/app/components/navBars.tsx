"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
export default function NavBar() {
  const { data: session } = useSession();
  console.log("this is session.....", session);
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

        <Link href={"/clips"} className={" p-3 mainNavLink "}>
          clips
        </Link>
        <Link href={"/notifications"} className={" p-3 mainNavLink "}>
          Notification
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
              <Image
                width={400}
                height={400}
                alt="haih"
                src={`${session?.user?.image as string}`}
                className=" rounded-full bg-cover w-[40px] h-[40px] "
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
