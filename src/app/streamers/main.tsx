"use client";
import React, { Suspense, useState } from "react";
import PageSearchBar from "../components/searchBar";
import { NormalSkeleton, HalfSkeleton } from "../skeletons/skeletonStreamer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/loading";
import Link from "next/link";
import Image from "next/image";
import { UserPageProfile } from "../components/image";
import GetPageByItsUnique from "./getPageByUnique";

type pagesProps = {
  id: string;
  name: string;
  adminId: string;
  createAt: Date;
  updateAt: Date;
  image: string;
};
export default function Main() {
  //fetch pages by its view rank,most viewed page will be rendered on top,(most like,most rated.etc...)
  const [getPageBy, setGetPageBy] = useState("mostViewed");
  const getPagess = async () => {
    try {
      const res = await axios.get(
        `http://yokeplay.vercel.app/api/pages?getBy=${getPageBy}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetPageType = (type: string) => {
    setGetPageBy(type);
  };
  const { data, status, error } = useQuery({
    queryKey: ["pages", getPageBy],
    queryFn: getPagess,
  });
  // console.log("this is data.... ", data);

  return (
    <>
      <GetPageByItsUnique changeUnique={handleGetPageType} />
      <main className=" flex flex-col items-center min-h-[100vh] xsm:pt-2 sm:pt-14 w-full bg-black ">
        <PageSearchBar />
        {status === "error" && (
          <div className=" w-full h-full flex justify-center items-center ">
            <h1 className=" text-4xl text-red-400 ">
              Opps there is an error:(
            </h1>
          </div>
        )}
        {/* {status === "loading" && <Loading />} */}
        {data && data?.length === 0 && (
          <div className=" w-full h-full flex justify-center items-center ">
            <h1 className=" text-4xl text-red-400 ">
              Opps there is no data right now!!
            </h1>
          </div>
        )}
        <section className="pageWarper mt-3 w-full h-full p-2  grid gap-2 xsm:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[86vh] overflow-auto">
          {status === "loading" ? (
            <>
              <NormalSkeleton />
              <HalfSkeleton />
            </>
          ) : (
            data &&
            data?.map((page: pagesProps, index: number) => (
              <Suspense fallback={<HalfSkeleton />} key={index}>
                <UserPageProfile {...page} />
              </Suspense>
            ))
          )}
        </section>
      </main>
    </>
  );
}
