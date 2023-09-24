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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CreateButton from "./floatingCreateBtn";
import Image from "next/image";
import ReportSomething from "../components/reportComponent";
import { useInView } from "react-hook-inview";
type videoProps = {
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

function VideoPlayer({
  title,
  video,
  pageOwnerId,
  likes,
  id,
  createdBy,
}: videoProps) {
  const [isCreating, setIsCreating] = useState(false); //user is creating clips or not toggling the creation page
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const [hide, setHide] = useState(true); //is report widget or page is hide or not
  const queryClient = useQueryClient();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { data: session, status } = useSession();
  const isLiked = likes.includes(session?.user?.id as any); //check current video is already liked by current user?

  // const mutation = useMutation(
  //   async () => {
  //     if (like.includes(session?.user.id as number)) {
  //       await removeLike(id, session?.user.id as number, like);
  //       await newNotification(
  //         session?.user.name as string,
  //         "clips",
  //         "like",
  //         id,
  //         author.name
  //       );
  //     } else {
  //       await addLike(id, session?.user.id as number, like);
  //     }
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ["clips"] });
  //     },
  //   }
  // );

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (!inView) {
      videoRef.current?.pause();
    }
  }, [inView]);

  // const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = parseFloat(event.target.value);
  //   }
  // };

  return (
    <article
      ref={ref}
      className=" video-player flex flex-col justify-center items-center xsm:w-[100vw] sm:w-[600px] relative rounded-lg mt-5"
    >
      <video
        ref={videoRef}
        src={video}
        className=" h-5hundred flex justify-center "
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlayPause}
      />
      {/* cover video with purble bars, disabled only when the use play the video */}
      {!isPlaying && (
        <div className=" absolute top-0 left-0 xsm:w-[95vw] sm:w-full h-full z-10 rounded-xl flex flex-col justify-between items-center ">
          {/* user profile and more option button and  blah blah */}
          <section className=" h-1hundred w-full bg-fuchsia-600 rounded-t-lg flex flex-col ">
            <div className="profileDiv flex justify-between items-center">
              <Link
                href={`/streamers/${createdBy?.name}`}
                className=" flex justify-start items-center p-1"
              >
                <Image
                  src={createdBy?.image}
                  width={100}
                  height={100}
                  alt="bruh"
                  className=" w-[50px] h-[50px] rounded-full bg-gray-400 mr-2 cursor-pointer"
                />
                <h4 className=" text-lg text-slate-400 cursor-pointer">
                  {createdBy?.name}
                </h4>
              </Link>
              {/* this is moreOption  */}
              <MoreOption setHide={() => setHide(false)} clipId={id} />
            </div>
            <p className=" text-sm text-slate-100 text-start items-center p-2 line-clamp-1">
              {title}
            </p>
          </section>
          <FontAwesomeIcon
            icon={faPlay}
            onClick={handlePlayPause}
            className=" text-4xl text-fuchsia-600 cursor-pointer"
          />
          <div className=" h-1hundred w-full bg-fuchsia-600 rounded-b-lg flex justify-between items-center">
            <div className=" m-4 flex justify-center items-center">
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
            />
          </div>
        </div>
      )}
      {!hide && <ReportSomething handleVisibillity={() => setHide(!hide)} />}
    </article>
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
        onClick={() => setMoreOption(!moreOption)}
        icon={faEllipsisVertical}
        className=" m-1 text-2xl cursor-pointer"
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
