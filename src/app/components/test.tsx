"use client";
import { useSession } from "next-auth/react";
export const MyButton = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p> Signed in as {session?.user?.name}</p>;
  }
  return (
    <>
      <a href="/api/auth/signin">
        You are not sign in
        <span className=" p-2 bg-white text-black">Sign in</span>
      </a>
    </>
  );
};
