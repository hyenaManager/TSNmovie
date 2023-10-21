"use client";
import React, { Suspense, useEffect, useState } from "react";
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
import ClipVideoPlayer from "./clipsVideoPlayer";
import ClipComment from "../components/comment";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const [onComment, setOnComment] = useState(false); //on click comment button
  const [selectedClip, setSelectedClip] = useState<{
    clipTitle: string;
    clipId: number;
    adminId: string;
  } | null>(null); //{clipTitle:title,clipId:id}

  const handleComment = (clip: {
    clipTitle: string;
    clipId: number;
    adminId: string;
  }) => {
    setSelectedClip(clip);
    setOnComment(true);
  };

  // queryClient.invalidateQueries({ queryKey: ["clips"] });
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <main className="pageWarper flex flex-col justify-center items-center pt-14  min-h-[100vh] ">
        {status === "loading" && (
          <div className=" animate-pulse ">
            <Image
              width={100}
              height={100}
              alt="loading"
              src={"/mycon.png"}
              className=" w-[100px] h-[100px]"
            />
          </div>
        )}
        {data?.pages?.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page?.clips?.map((video: videoPageProp, index: number) => (
              <Suspense fallback={<SkeletonClip key={index} />} key={video.id}>
                <ClipVideoPlayer
                  {...video}
                  key={video.id}
                  handleComment={handleComment}
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
        <AnimatePresence>
          {onComment && (
            <ClipComment
              clip={selectedClip}
              hideComment={() => setOnComment(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
