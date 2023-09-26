"use client";
import {
  faComment,
  faEllipsisVertical,
  faHeart,
  faPause,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Link from "next/link";

import Image from "next/image";
import ReportSomething from "@/app/components/reportComponent";
import { motion, spring } from "framer-motion";

type videoProps = {
  id: string;
  title: string | null;
  video: string;
  likes: string[];
  link: string | null;
  createAt: Date;
  updateAt: Date;
  pageImage: string;
  createdBy: any;
};

function VideoPlayer({
  title,
  video,
  pageImage,
  likes,
  id,
  createdBy,
}: videoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const [hide, setHide] = useState(true); //is report widget or page is hide or not
  const queryClient = useQueryClient();

  const { data: session, status } = useSession();
  const isLiked = likes.includes(session?.user?.id as any); //check current video is already liked by current user?

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
        " video-player flex flex-col justify-center items-center w-full p-2 relative rounded-lg mt-5 " +
        (isPlaying
          ? " z-40 backdrop-blur-sm h-full flex items-center justify-center"
          : " max-h-[500px]")
      }
    >
      <video
        ref={videoRef}
        src={video}
        className={
          " flex justify-center " +
          (isPlaying ? "h-[90%]" : " sm:h-3hundred xsm:h-2hundred")
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
                href={`/streamers/${createdBy?.name}`}
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
              <MoreOption setHide={() => setHide(false)} clipId={id} />
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
      {/* <CreateButton isCreating={() => setIsCreating(!isCreating)} />
      {isCreating && (
        <CreateMovie isCreating={() => setIsCreating(!isCreating)} />
      )} */}
      {!hide && <ReportSomething handleVisibillity={() => setHide(!hide)} />}
    </motion.article>
  );
}

function MoreOption({
  setHide,
  clipId,
}: {
  setHide: () => void;
  clipId: string;
}) {
  const [moreOption, setMoreOption] = useState<boolean>(false); //is user click moreoption or not, for toggling more option

  return (
    <div className=" moreOption flex flex-col">
      <FontAwesomeIcon
        onClick={(e) => {
          e.stopPropagation();
          setMoreOption(!moreOption);
        }}
        icon={faEllipsisVertical}
        className=" m-1 xsm:text-sm sm:text-2xl cursor-pointer shadow-[0px_0px_10px_purple]"
      />
      {moreOption && (
        <ul className=" absolute origin-top-right right-1 top-[50px] rounded-md flex flex-col bg-white divide-y divide-fuchsia-600">
          <li
            onClick={(e) => {
              setMoreOption(!moreOption);
              e.stopPropagation;
            }} //copy link of video
            className="text-black text-sm min-w-[100px] rounded-t-md text-center hover:bg-fuchsia-300 cursor-pointer p-2"
          >
            copy link
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              setMoreOption(!moreOption);
              setHide();
            }}
            className="text-black text-sm min-w-[100px] rounded-b-md text-center hover:bg-fuchsia-300 cursor-pointer p-2"
          >
            report
          </li>
        </ul>
      )}
    </div>
  );
}

export default VideoPlayer;
