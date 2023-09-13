"use client";
import {
  faComment,
  faHeart,
  faPause,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, newNotification, removeLike } from "./clipsApi";
import Link from "next/link";
type videoProps = {
  title: string;
  author: { name: string };
  video: string;
  id: number;
  like: number[];
  link: string;
};

function VideoPlayer({ title, author, video, id, like, link }: videoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const queryClient = useQueryClient();

  const { data: session, status } = useSession();
  const isLiked = like.includes(session?.user.id as number); //check current video is already liked by current user?

  const mutation = useMutation(
    async () => {
      if (like.includes(session?.user.id as number)) {
        await removeLike(id, session?.user.id as number, like);
        await newNotification(
          session?.user.name as string,
          "clips",
          "like",
          id,
          author.name
        );
      } else {
        await addLike(id, session?.user.id as number, like);
      }
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["clips"] });
      },
    }
  );

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  // console.log("re-renders..");

  // const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = parseFloat(event.target.value);
  //   }
  // };

  return (
    <article className=" video-player flex flex-col justify-center items-center xsm:w-[99%] sm:w-[600px] p-2 relative rounded-lg mt-5">
      <video
        ref={videoRef}
        src={video}
        className=" h-5hundred flex justify-center "
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* cover video with purble bars, disabled only when the use play the video */}
      {!isPlaying ? (
        <div className=" absolute top-0 left-0 w-full h-full z-20 rounded-xl flex flex-col justify-between ">
          {/* user profile and link blah blah */}
          <div className=" h-1hundred bg-fuchsia-600 rounded-t-lg flex flex-col ">
            <div className=" flex justify-start items-center p-2">
              <div className=" w-[50px] h-[50px] rounded-full bg-gray-400 mr-2 cursor-pointer"></div>
              <h4 className=" text-lg text-slate-400 cursor-pointer">
                {author.name}
              </h4>
            </div>
            <span className=" text-sm text-slate-100 text-start items-center p-2">
              {title}
              {link !== "" && (
                <Link href={link} className=" text-blue-600 font-bold p-1">
                  Link
                </Link>
              )}
            </span>
          </div>
          <FontAwesomeIcon
            icon={faPlay}
            onClick={handlePlayPause}
            className=" text-4xl text-fuchsia-600 cursor-pointer"
          />
          <div className=" h-1hundred bg-fuchsia-600 rounded-b-lg flex justify-between items-center">
            <div className=" m-4 flex justify-center items-center">
              <FontAwesomeIcon
                onClick={() => {
                  mutation.mutate();
                }}
                icon={faHeart}
                className={
                  " text-2xl p-1 cursor-pointer " +
                  (isLiked ? " text-red-600" : " text-white")
                }
              />
              <span className=" text-white">{like.length}</span>
            </div>
            <FontAwesomeIcon
              icon={faComment}
              className=" text-white text-2xl m-4 cursor-pointer  "
            />
          </div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faPause}
          onClick={handlePlayPause}
          className=" absolute top-6 right-6 text-4xl text-fuchsia-600 cursor-pointer"
        />
      )}
    </article>
  );
}
export default VideoPlayer;
