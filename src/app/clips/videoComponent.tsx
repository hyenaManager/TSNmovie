"use client";
import React, { Suspense, useEffect, useState } from "react";
import VideoPlayer from "./clipsVideoPlayer";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import SkeletonClip from "../skeletons/skeletonClip";

import axios from "axios";

import CreateClips from "../components/clips/createClips";
import CreateButton from "../components/floatingCreateBtn";
import { ClipLoading } from "../components/loading";
import { useInView } from "react-hook-inview";
import { Toaster } from "react-hot-toast";
import { signOut } from "next-auth/react";

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
  const queryClient = useQueryClient();
  const [ref, inView] = useInView();
  const [isCreating, setIsCreating] = useState(false);

  // queryClient.invalidateQueries({ queryKey: ["clips"] });
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["clips"],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/clips/cursor?cursor=${pageParam}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
  console.log("this is clips", data?.pages);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <main className="pageWarper flex flex-col justify-center items-center overflow-auto pt-3 ">
        {status === "loading" && <SkeletonClip />}
        {status === "error" && (
          <div className=" min-w-fit min-h-fit flex justify-center items-center xsm:h-[300px] sm:w-[600px] sm:h-[400px]  ">
            <h1 className=" text-4xl text-red-400 min-w-fit min-h-fit text-center ">
              Opps there is an error:(
            </h1>
          </div>
        )}
        {data?.pages?.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page?.clips?.map((video: videoPageProp, index: number) => (
              <Suspense fallback={<SkeletonClip key={index} />} key={video.id}>
                <VideoPlayer
                  {...video}
                  key={video.id}
                  pageCreatorId={page.id}
                />
              </Suspense>
            ))}
          </React.Fragment>
        ))}
        {/* button for creating clips */}
        <CreateButton isCreating={() => setIsCreating(!isCreating)} />
        {/* creating widget for clips */}
        {isCreating && (
          <CreateClips isCreating={() => setIsCreating(!isCreating)} />
        )}
        {hasNextPage && (
          <div ref={ref}>
            <ClipLoading />
          </div>
        )}
        <Toaster />
      </main>
    </>
  );
}
