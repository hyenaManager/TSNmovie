"use client";
import ClipVideoPlayer from "@/app/clips/clipsVideoPlayer";
import ClipComment from "@/app/components/comment";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClipNoti() {
  const [onComment, setOnComment] = useState(false); //on click comment button
  const [selectedClip, setSelectedClip] = useState<{
    clipTitle: string;
    clipId: number;
    adminId: string;
  } | null>(null); //{clipTitle:title,clipId:id}
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const clipId = searchParams.get("clipId") as string;
  const handleComment = (clip: {
    clipTitle: string;
    clipId: number;
    adminId: string;
  }) => {
    setSelectedClip(clip);
    setOnComment(true);
  };
  console.log(clipId, "is clip id");

  const { data, status } = useQuery({
    queryKey: ["clip", parseInt(clipId)],
    queryFn: async () => {
      const response = await axios.get(
        `https://yokeplay.vercel.app/api/clips/oneClip?clipId=${clipId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    },
  });
  return (
    <div className="pageWarper z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-black flex flex-col justify-center items-center">
      <ClipVideoPlayer {...data} handleComment={handleComment} />
      <Link href="/adminSite">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className=" p-2 fixed top-1 left-1 w-[20px] h-[20px] text-yellow-400 rounded-full border-2 border-yellow-500"
        />
      </Link>
      <AnimatePresence>
        {onComment && (
          <ClipComment
            clip={selectedClip}
            hideComment={() => setOnComment(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
