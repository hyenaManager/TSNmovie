"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SkeletonClip from "../skeletons/skeletonClip";

import axios from "axios";
import { ClipLoading } from "../../components/loading";
import { useInView } from "react-hook-inview";
import { Toaster } from "react-hot-toast";
import ClipVideoPlayer from "./clipsVideoPlayer";
import { AnimatePresence } from "framer-motion";
import ClipComment from "../../components/comment";
import { NProgressLink } from "@/components/customLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const [ref, inView] = useInView();
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
          `https://yokeplay.vercel.app/api/clips/cursor?cursor=${pageParam}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
    initialPageParam: 0,
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
        {status === "pending" &&
          [1, 2, 3, 4].map((num) => <SkeletonClip key={num} />)}
        {data?.pages?.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page?.clips?.map((video: videoPageProp, index: number) => (
              <ClipVideoPlayer
                {...video}
                handleComment={handleComment}
                key={index}
              />
            ))}
          </React.Fragment>
        ))}
        <NProgressLink
          href="/clips/createClip"
          className={
            "fixed xsm:bottom-0 xsm:right-50 z-20 sm:bottom-9 sm:right-10"
          }
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="p-3 cursor-pointer flex justify-center xsm:w-[40px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] bg-green-400 xsm:rounded-lg sm:rounded-full text-white items-center"
          />
        </NProgressLink>
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
