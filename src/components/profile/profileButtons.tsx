"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { EditUserData } from "./userProfileComponents";

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
      className="xsm:text-sm sm:text-xl pl-4 pr-4 p-2 text-white bg-red-400 hover:bg-red-800 rounded-lg absolute bottom-2 right-3"
    >
      Logout
    </button>
  );
}

export function AdminSiteButton() {
  return (
    <Link
      href={"/adminSite"}
      className="xsm:text-sm sm:text-xl pl-4 pr-4 p-2 text-white bg-green-500 hover:bg-green-800 hover:text-white rounded-lg absolute bottom-2 left-3"
    >
      Admin
    </Link>
  );
}

export function UserEditButton() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="pageWarper bg-fuchsia-500 hover:bg-fuchsia-700 text-white mt-4 w-full rounded-md px-4 py-2"
      >
        Edit Profile
      </button>
      {/* {isEditing ? (
          <EditUserProfile setIsEditing={() => setIsEditing(false)} />
        ) : null} */}
      {isEditing ? (
        <EditUserData setIsEditing={() => setIsEditing(false)} />
      ) : null}
    </>
  );
}
