"use client";
import React, { Suspense } from "react";
import PageSearchBar from "../components/searchBar";
import SkeletonStreamer from "../skeletons/skeletonStreamer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/loading";
import Link from "next/link";
import Image from "next/image";
import { getPages } from "./pageApi";

type pagesProps = {
  id: string;
  name: string;
  adminId: string;
  createAt: Date;
  updateAt: Date;
  image: string;
};
export default function Main() {
  const getPagess = async () => {
    try {
      const res = await axios.get("/api/pages");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, status, error } = useQuery({
    queryKey: ["userPages"],
    queryFn: getPagess,
  });
  return (
    <>
      <main className=" flex flex-col items-center min-h-[100vh] pt-14 w-full bg-black relative">
        <PageSearchBar />
        {status === "error" && (
          <div className=" w-full h-full flex justify-center items-center ">
            <h1 className=" text-4xl text-red-400 ">
              Opps there is an error:(
            </h1>
          </div>
        )}
        {status === "loading" && <Loading />}
        {data?.length === 0 && (
          <div className=" w-full h-full flex justify-center items-center ">
            <h1 className=" text-4xl text-red-400 ">
              Opps there is no data right now!!
            </h1>
          </div>
        )}
        <section className=" mt-3 w-full h-full  grid grid-cols-5 max-h-[86vh] overflow-auto">
          {data?.map((page: pagesProps, index: number) => (
            <Suspense fallback={<SkeletonStreamer />} key={index}>
              <UserPageProfile {...page} />
            </Suspense>
          ))}
        </section>
      </main>
    </>
  );
}

export function UserPageProfile({ id, name, image }: pagesProps) {
  return (
    <>
      <article
        className=" flex flex-col items-center text-xl p-5"
        key={JSON.stringify(id)}
      >
        <Image
          width={240}
          height={240}
          alt={name}
          src={image}
          className=" w-[240px] h-[240px] rounded-full bg-gray-400 shadow-[0_0_20px_purple] "
        />
        <Link href={`/streamers/${name}`}>
          <h2> {name} </h2>
        </Link>
      </article>
    </>
  );
}
