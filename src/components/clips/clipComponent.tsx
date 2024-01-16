"use client";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import Link from "next/link";

import Image from "next/image";
const ReportSomething = lazy(() => import("@/app/components/reportComponent"));
import { motion } from "framer-motion";
import MoreOption from "./moreOption";

type videoProps = {
  id: string;
  title: string | null;
  video: string;
  likes: string[];
  link: string | null;
  createAt: Date;
  updateAt: Date;
  pageImage: string;
  pageOwnerId: string;
  createBy: any;
};

function VideoPlayer({
  title,
  video,
  pageImage,
  likes,
  id,
  pageOwnerId,
  createBy,
}: videoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const [hide, setHide] = useState(true); //is report widget or page is hide or not
  const queryClient = useQueryClient();

  const { data: session, status } = useSession();
  const isLiked = likes?.includes(session?.user?.id as any); //check current video is already liked by current user?

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 1, x: 0, y: 0 }}
      animate={
        isPlaying
          ? { opacity: 1, position: "fixed", top: 0, right: 0 }
          : { opacity: 1, x: 0, y: 0 }
      }
      transition={{ duration: 0.4 }}
      onClick={() => handlePlayPause()}
      className={
        " video-player flex flex-col justify-center items-center w-full p-2 relative rounded-lg " +
        (isPlaying
          ? " z-40 backdrop-blur-sm h-full flex items-center justify-center"
          : " max-h-[500px] mt-5")
      }
    >
      <video
        ref={videoRef}
        src={video}
        className={
          " flex justify-center " +
          (isPlaying ? "h-[100%]" : " sm:h-3hundred xsm:h-2hundred")
        }
        onPlay={() => {
          setIsPlaying(true);
          // enterFullScreen();
        }}
        onPause={() => {
          setIsPlaying(false);
          // exitFullScreen();
        }}
      />
      {/* cover video with purble bars, disabled only when the use play the video */}
      {!isPlaying && (
        <div className=" absolute top-0 left-0 border border-fuchsia-400 w-full h-full z-10 rounded-xl flex flex-col justify-between ">
          {/* user profile and more option button and  blah blah */}
          <section className=" xsm:h-[20px] sm:h-[60px] rounded-t-lg flex flex-col ">
            <div className="profileDiv flex justify-between items-center">
              <Link
                href={`/streamers/${pageOwnerId}`}
                className=" flex justify-start items-center p-2"
              >
                <Image
                  src={pageImage}
                  width={100}
                  height={100}
                  alt="bruh"
                  className=" xsm:hidden sm:flex sm:w-[50px] sm:h-[50px] rounded-full bg-gray-400 mr-2 cursor-pointer"
                />
              </Link>
              {/* this is moreOption  */}
              <MoreOption
                setHide={() => setHide(false)}
                pageOwnerId={pageOwnerId}
                clipId={id}
                video={video}
              />
            </div>
            {/* <p className=" text-sm text-slate-100 text-start items-center p-2 line-clamp-1">
              {title}
            </p> */}
          </section>
          <FontAwesomeIcon
            icon={faPlay}
            onClick={() => {
              handlePlayPause();
              // toggleFullScreen();
            }}
            className=" text-4xl text-fuchsia-600 cursor-pointer"
          />
          <div className=" xsm:h-[20px] sm:h-[60px]  rounded-b-lg flex justify-between items-center">
            {/* <div className=" m-4 flex justify-center items-center">
              <FontAwesomeIcon
                // onClick={() => {
                //   mutation.mutate();
                // }}
                icon={faHeart}
                className={
                  " text-2xl p-1 cursor-pointer " +
                  (isLiked ? " text-red-600" : " text-white")
                }
              />
              <span className=" text-white">{likes.length}</span>
            </div>
            <FontAwesomeIcon
              icon={faComment}
              className=" text-white text-2xl m-4 cursor-pointer  "
            /> */}
          </div>
        </div>
      )}
      {!hide && (
        <ReportSomething
          handleVisibillity={() => setHide(!hide)}
          userId={createBy?.adminId}
          postId={parseInt(id)}
        />
      )}
    </motion.article>
  );
}

export default VideoPlayer;
