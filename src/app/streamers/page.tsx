"use client";
import React, { Suspense } from "react";
import UserPageProfile from "./userProfile";
import PageSearchBar from "../components/searchBar";
import GetPageByItsUnique from "./getPageByUnique";
import { getPages } from "./pageApi";
import { useQuery } from "@tanstack/react-query";
type pagesProps = {
  name: string;
  id: number;
  image: string;
};

export default function Pages() {
  const { data, status } = useQuery({
    queryKey: ["userPages"],
    queryFn: getPages,
  });

  if (status === "loading") return <p>Loading.....</p>;
  return (
    <main className=" flex justify-center text-white  ">
      <section className=" w-4hundred h-[100vh] bg-white pt-14 ">
        <GetPageByItsUnique />
      </section>
      <div className=" flex flex-col items-center min-h-[100vh] pt-14 w-full bg-black relative">
        <PageSearchBar />
        <div className=" mt-3 w-full h-full  grid grid-cols-5 max-h-[86vh] overflow-auto">
          {data.map((page: pagesProps) => (
            <Suspense fallback={<p className=" text-white">Loading....</p>}>
              <UserPageProfile {...page} />
            </Suspense>
          ))}
        </div>
      </div>
    </main>
  );
}
