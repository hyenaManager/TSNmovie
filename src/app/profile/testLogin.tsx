"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LogInOut() {
  return (
    <button
      onClick={() => signOut()}
      className=" bg-black text-white border rounded-lg w-[80px] h-[40px] hover:bg-red-400 fixed bottom-6 right-7"
    >
      Logout
    </button>
  );
}
