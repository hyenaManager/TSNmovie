"use client";
import Image from "next/image";

import { UserPageProfile } from "../components/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { ProfileNavSkeleton } from "../skeletons/skeletonStreamer";

export default function FollowAndVistPageSection() {
  const { data: session } = useSession();
  const { data, status } = useQuery({
    queryKey: ["user", session?.user.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${session?.user.email}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
  return (
    <section className=" w-[70vw] bg-black h-[100vh] pt-14 flex flex-col ">
      {status === "loading" || status === "error" ? (
        <ProfileNavSkeleton />
      ) : (
        <nav className=" flex p-2 justify-between items-center border-b-2 border-fuchsia-500">
          <Link
            href={`profile/${data?.Page?.id}`}
            className=" flex justify-center items-center"
          >
            <Image
              src={"/hat.png"}
              width={40}
              height={40}
              className=" w-[40px] rounded-full"
              alt="page"
            />
            <h3 className=" text-center text-white text-lg p-2 uppercase">
              Visit your page{" "}
              <b className=" text-red-500">{data?.Page?.name}</b>
            </h3>
          </Link>
        </nav>
      )}
      {/* Following */}
      <div className="">
        <h2 className="text-2xl text-white p-1">Following</h2>
        <div className=" grid grid-cols-4 gap-5 p-2 ">
          {[1, 2, 3, 4, 5].map((number) => (
            <UserPageProfile
              id="1"
              name="Blah Blah"
              image="/hat.png"
              key={number}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
