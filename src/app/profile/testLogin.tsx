"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Bruh() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <p className=" mt-16 bg-black text-white">
          Signed in as {session?.user?.name}
        </p>
        <button
          onClick={() => signOut()}
          className=" bg-black text-white mt-16"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <button onClick={() => signIn()} className=" bg-black text-white mt-16">
      Sign in
    </button>
  );
}
