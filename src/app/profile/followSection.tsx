"use client";
import Image from "next/image";

import { UserPageProfile } from "../components/image";
import Link from "next/link";
import {
  HalfSkeleton,
  NormalSkeleton,
  ProfileNavSkeleton,
} from "../skeletons/skeletonStreamer";
import { useContext } from "react";
import { userProvider } from "../context/userContext";

export default function FollowAndVistPageSection() {
  const { user, userPage }: any = useContext(userProvider);
  console.log(user);

  return (
    <section className=" sm:w-[70vw] bg-black xsm:w-[100vw] xsm:min-h-[70vh] sm:min-h-[92vh] xsm:pt-2 sm:pt-2 flex flex-col ">
      {!userPage ? (
        userPage === null ? (
          <Link
            href={"/gettingStart"}
            className=" p-1 rounded-md bg-green-400 hover:bg-green-600 text-white text-lg m-1 max-w-fit"
          >
            create page
          </Link>
        ) : (
          <ProfileNavSkeleton />
        )
      ) : (
        <nav className=" flex p-2 justify-between items-center border-b-2 border-fuchsia-500">
          <Link
            href={`profile/page`}
            className=" flex justify-center items-center"
          >
            <Image
              src={userPage?.image}
              width={100}
              height={100}
              className=" w-[50px] h-[50px] object-cover rounded-full"
              alt="page"
            />
            <h3 className=" text-center text-white text-lg p-2 uppercase">
              Visit your page
              <b className=" text-red-500">{userPage?.name}</b>
            </h3>
          </Link>
        </nav>
      )}
      {/* Following */}
      <div className="">
        <h2 className="text-2xl text-white p-1">Following</h2>
        <div className=" grid xsm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-2 ">
          {!user ? (
            <>
              <NormalSkeleton />
              <HalfSkeleton />
            </>
          ) : (
            user?.following?.map((followedPage: any) => (
              <UserPageProfile
                id={followedPage.id}
                name={followedPage.name}
                image={followedPage.image}
                key={followedPage.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
