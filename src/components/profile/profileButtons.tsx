"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function LognInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="xsm:text-sm sm:text-xl p-2 text-fuchsia-500 hover:text-white rounded-md "
    >
      LognIn
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="xsm:text-sm sm:text-lg lg:text-xl sm:px-2 lg:px-4 p-2 text-white bg-red-400 hover:bg-red-800 rounded-lg absolute bottom-2 right-3"
    >
      Logout
    </button>
  );
}

export function AdminSiteButton() {
  return (
    <Link
      href={"/adminSite"}
      className="xsm:text-sm sm:text-lg lg:text-xl sm:px-2 lg:px-4 p-2 text-white bg-green-500 hover:bg-green-800 hover:text-white rounded-lg absolute bottom-2 left-3"
    >
      Admin
    </Link>
  );
}
