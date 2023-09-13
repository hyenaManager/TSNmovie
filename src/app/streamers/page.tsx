"use client";
import React, { Suspense, useEffect, useState } from "react";
import UserPageProfile from "./userProfile";
import PageSearchBar from "../components/searchBar";
import GetPageByItsUnique from "./getPageByUnique";
import { getPages } from "./pageApi";
import { useQuery } from "@tanstack/react-query";
import SkeletonStreamer from "../skeletons/skeletonStreamer";
import Loading from "../components/loading";

type pagesProps = {
  name: string;
  id: number;
  image: string;
};

export default function Pages() {
  const [timeUp, setTimeUp] = useState(false);
  const { data, status, error } = useQuery({
    queryKey: ["userPages"],
    queryFn: getPages,
  });

  const fakeData = data?.map(() => <SkeletonStreamer />);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeUp(true);
    }, 5000);

    // Don't forget to clear the timer to prevent memory leaks
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="pageWarper flex justify-center text-white  ">
      <aside className=" w-4hundred h-[100vh] bg-slate-950 pt-14 p-2 ">
        <GetPageByItsUnique />
      </aside>
      <main className=" flex flex-col items-center min-h-[100vh] pt-14 w-full bg-black relative">
        <PageSearchBar />
        {status === "error" && (
          <div className=" w-full h-full flex justify-center items-center ">
            <h1 className=" text-4xl text-red-400 border-2">
              Opps there is an error:(
            </h1>
          </div>
        )}
        {status === "loading" && <Loading />}
        <section className=" mt-3 w-full h-full  grid grid-cols-5 max-h-[86vh] overflow-auto">
          {data?.map((page: pagesProps, index: number) => (
            <Suspense fallback={<SkeletonStreamer />} key={index}>
              <UserPageProfile {...page} />
            </Suspense>
          ))}
        </section>
      </main>
    </div>
  );
}
