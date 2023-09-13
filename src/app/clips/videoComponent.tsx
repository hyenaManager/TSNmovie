"use client";
import React from "react";
import VideoPlayer from "./clipsVideo";
import { getFeedVideo } from "./clipsApi";
import { useQuery } from "@tanstack/react-query";
import SkeletonClip from "../skeletons/skeletonClip";
import Loading from "../components/loading";

type videoPageProp = {
  title: string; //video tile
  author: { name: string }; //video creator blah blah..
  video: string; //video source for now its string for local src link
  id: number; //video id
  like: number[]; //video's total like in list
  link: string; // other related video link can be null,exist only when the user add link
};

export default function VideoComponent() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["clips"],
    queryFn: getFeedVideo,
  });
  return (
    <main className=" flex flex-col justify-center items-center overflow-auto ">
      {status === "loading" && <Loading />}
      {status === "error" && (
        <div className=" min-w-fit min-h-fit flex justify-center items-center xsm:h-[300px] sm:w-[600px] sm:h-[400px]  ">
          <h1 className=" text-4xl text-red-400 min-w-fit min-h-fit text-center ">
            Opps there is an error:(
          </h1>
        </div>
      )}
      {data?.map((video: videoPageProp, index: number) =>
        status === "loading" && !data ? (
          <SkeletonClip key={index} />
        ) : (
          <VideoPlayer {...video} key={video.id} />
        )
      )}
    </main>
  );
}
