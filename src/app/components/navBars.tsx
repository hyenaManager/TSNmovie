"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { userProvider } from "../context/userContext";
export default function NavBar() {
  const { data: session } = useSession();
  //checking if the user has page ,if exist push to profile path
  console.log("session image is :", session?.user.image);
  const { user, userPage }: any = useContext(userProvider);
  console.log("user is:", user);

  return (
    <>
      <nav className="pageWarper text-white z-40 flex b justify-between bg-none items-center mainNav fixed right-0 left-0 backdrop-blur-sm top-0">
        <Link href={"/"} className=" font-mono text-fuchsia-600 ml-3">
          <Image
            src={"/mycon.png"}
            alt="icon"
            width={100}
            height={100}
            className="w-[40px] h-[40px] "
          />
        </Link>

        <Link
          href={"/clips"}
          className={
            " p-1 mainNavLink flex sm:flex-row xsm:flex-col justify-center items-center"
          }
        >
          <Image
            src={"/svgs/clips.svg"}
            width={100}
            height={100}
            alt="clips"
            className="w-[30px] h-[30px]"
          />
          <h4 className=" xsm:hidden sm:flex">clips</h4>
        </Link>
        <Link
          href={"/notifications"}
          className={
            " p-1 mainNavLink flex sm:flex-row xsm:flex-col items-center "
          }
        >
          <Image
            src={"/svgs/noti.svg"}
            width={100}
            height={100}
            alt="clips"
            className="w-[30px] h-[30px] "
          />
          <h4 className=" xsm:hidden sm:flex">notifications</h4>
        </Link>
        <Link
          href={"/streamers"}
          className={
            " p-1 mainNavLink flex sm:flex-row xsm:flex-col items-center "
          }
        >
          <Image
            src={"/svgs/streamers.svg"}
            width={100}
            height={100}
            alt="clips"
            className="w-[30px] h-[30px] "
          />
          <h4 className=" xsm:hidden sm:flex">streamers</h4>
        </Link>
        <Link
          href={"/profile"}
          className=" flex justify-center p-1 mainNavLink item sm:flex-row xsm:flex-cols-center"
        >
          {user ? (
            <>
              <span className=" text-fuchsia-400 xsm:hidden sm:block text-lg p-1">
                {user?.firstName + " " + user?.lastName}
              </span>
              <Image
                width={400}
                height={400}
                alt="haih"
                src={`${user?.image as string}`}
                className=" rounded-full bg-cover xsm:w-[27px] object-cover xsm:h-[27px] sm:w-[40px] sm:h-[40px] "
              />
            </>
          ) : (
            <Image
              width={400}
              height={400}
              alt="haih"
              src={`/defaultProfile.jpeg`}
              className=" rounded-full bg-cover xsm:w-[27px] object-cover xsm:h-[27px] sm:w-[40px] sm:h-[40px] "
            />
          )}
        </Link>
      </nav>
    </>
  );
}
