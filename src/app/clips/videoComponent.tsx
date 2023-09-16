"use client";
import React from "react";
import VideoPlayer from "./clipsVideoPlayer";
import { getFeedVideo } from "./clipsApi";
import { useQuery } from "@tanstack/react-query";
import SkeletonClip from "../skeletons/skeletonClip";

import SpinLoading from "../components/spinLoading";
import axios from "axios";

type videoPageProp = {
  id: string;
  title: string | null;
  video: string;
  likes: string[];
  link: string | null;
  createAt: Date;
  updateAt: Date;
  pageOwnerId: string;
  createdBy: any;
};

export default function VideoComponent() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["clips"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clips");
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
  });
  return (
    <main className=" flex flex-col justify-center items-center overflow-auto ">
      {status === "loading" && <SkeletonClip />}
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
