"use client";
import { faEdit, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";
import { userProvider } from "../context/userContext";
export default function UserProfile() {
  const { user, userPage }: any = useContext(userProvider);
  return (
    <section className="xsm:w-[100vw] sm:w-[30vw] bg-fuchsia-600 xsm:h-[30vh] sm:h-[100vh] flex xsm:flex-row sm:flex-col justify-center relative items-center">
      <div className=" relative flex p-2 justify-center items-center">
        <Image
          src={"/hat.png"}
          alt="profile"
          width={100}
          height={100}
          className=" bg-cover rounded-full"
        />
        {/* <input type="file" hidden onChange={} /> */}
        <FontAwesomeIcon
          icon={faEdit}
          title="upload photo"
          className=" absolute top-0 right-0 cursor-pointer w-[20px] h-[20px] text-white"
        />
      </div>
      <h2 className="xsm:text-sm sm:text-4xl p-1 rounded-full m-1 text-slate-800 capitalize text-center">
        {`${user?.firstName} ${user?.lastName}`}
      </h2>
      <div className=" bg-white xsm:p-1 md:p-3 rounded-full m-1 flex  justify-center items-center text-fuchsia-800 text-center">
        <h2 className=" italic xsm:text-sm lg:text-2xl">{user?.email}</h2>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="  text-blue-500 w-[30px] h-[30px]"
        />
      </div>
      <h2 className="xsm:text-sm sm:text-2xl bg-white xsm:p-1 md:p-3 rounded-full m-1 text-fuchsia-800 text-center">
        No address
      </h2>
      <button
        onClick={() => signOut()}
        className="xsm:text-sm sm:text-xl pl-4 pr-4 p-2 text-white bg-slate-800 hover:bg-red-800 rounded-lg absolute bottom-3 right-3"
      >
        Logout
      </button>
    </section>
  );
}
