"use client";
import React from "react";
import VideoPlayer from "./feedVideo";
import { getFeedVideo } from "./feedApi";
import { useQuery } from "@tanstack/react-query";

type videoPageProp = {
  title: string;
  author: { name: string };
  video: string;
  id: number;
  like: number[];
};

export default function VideoComponent() {
  const { data, status } = useQuery({
    queryKey: ["clips"],
    queryFn: getFeedVideo,
  });
  return (
    <main className=" flex flex-col justify-center items-center overflow-auto ">
      {data?.map((video: videoPageProp) => (
        <VideoPlayer {...video} key={video.id} />
      ))}
    </main>
  );
}
