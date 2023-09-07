"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileLink() {
  const { data: session, status } = useSession();
  return (
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
  );
}
