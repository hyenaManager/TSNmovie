"use client";
import { faComment, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import Image from "next/image";
import ReportSomething from "../components/reportComponent";
import { useInView } from "react-hook-inview";

import axios from "axios";
import toast from "react-hot-toast";

import MoreOption from "../components/clips/moreOption";
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
  handleComment: (clip: any) => void;
};

function ClipVideoPlayer({
  title,
  video,
  pageOwnerId,
  likes,
  id,
  createdBy,
  handleComment,
}: videoProps) {
  const [isCreating, setIsCreating] = useState(false); //user is creating clips or not toggling the creation page
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const [hide, setHide] = useState(true); //is report widget or page is hide or not
  const queryClient = useQueryClient();
  const [readMore, setReadMore] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { data: session, status } = useSession();
  const isLiked =
    likes?.find((user: any) => user.id === session?.user.id) !== undefined; //check current video is already liked by current user?
  console.log("like givers :", likes);

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

  //creating new notification
  const handleCreatNotification = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/notifications`,
      {
        message: `${session?.user.name} like your clip`,
        type: "like",
        holder: "clip",
        userEmail: session?.user.email,
        userId: createdBy?.adminId,
        holderId: id,
      }
    );
    if (response.status === 500) {
      toast.error(response.statusText);
    }
  };

  //adding like or remove like
  const handleLike = async () => {
    const type = isLiked ? "removeLike" : "addLike"; //if user already liked, remove the the like or add  the like
    const response = await axios.put(
      `http://localhost:3000/api/clips/like?clipId=${id}&userId=${session?.user.id}&type=${type}&pageId=${createdBy.id}`
    );
    if (response.status === 200) {
      toast.success(response.data);
      type === "addLike" && handleCreatNotification();
    }
    if (response.status === 500) {
      toast.error(`${response.statusText}`);
    }
  };
  const mutation = useMutation(handleLike, {
    onSuccess: () => queryClient.invalidateQueries(["clips"]),
  });

  return (
    <article
      ref={ref}
      className=" video-player flex flex-col justify-center m-1 items-center xsm:w-[100vw] sm:w-[600px] relative rounded-lg mt-2"
    >
      <video
        ref={videoRef}
        src={video}
        className=" h-5hundred flex justify-center rounded-xl "
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlayPause}
      />
      {/* cover video with purble bars, disabled only when the use play the video */}
      {!isPlaying && (
        <div className=" absolute top-0 left-0 xsm:w-[99vw] sm:w-full h-full z-10 rounded-xl flex flex-col justify-between items-center ">
          {/* user profile and more option button and  blah blah */}
          <section
            className={
              " w-full bg-fuchsia-600 rounded-t-lg flex flex-col " +
              (readMore ? " min-w-fit" : "h-1hundred")
            }
          >
            <div className="profileDiv flex justify-between items-center">
              <Link
                href={`/streamers/${createdBy?.id}`}
                className=" flex justify-start items-center p-1"
              >
                <Image
                  src={createdBy?.image}
                  width={100}
                  height={100}
                  alt="bruh"
                  className=" w-[50px] h-[50px] object-cover rounded-full bg-gray-400 mr-2 cursor-pointer"
                />
                <h4 className=" text-lg text-slate-400 cursor-pointer">
                  {createdBy?.name}
                </h4>
              </Link>
              {/* this is moreOption  */}
              <MoreOption
                setHide={() => setHide(false)}
                clipId={id}
                pageOwnerId={pageOwnerId}
                video={video}
              />
            </div>
            <pre
              className={
                " text-sm text-slate-100 text-start items-center relative p-1 " +
                (!readMore &&
                  title &&
                  title.split("").length > 40 &&
                  " line-clamp-1")
              }
            >
              {readMore ? title : title?.substring(0, 40)}
              {title && title.split("").length > 40 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className=" text-start items-center text-white absolute right-0 top-0"
                >
                  {readMore ? "readless" : "readmore"}
                </button>
              )}
            </pre>
          </section>
          <FontAwesomeIcon
            icon={faPlay}
            onClick={handlePlayPause}
            className=" text-4xl text-fuchsia-600 cursor-pointer"
          />
          <div className=" h-1hundred w-full bg-fuchsia-600 rounded-b-lg flex justify-between items-center">
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
              <span className=" text-white">{likes?.length}</span>
            </div>
            <button className="flex justify-center m-4 items-center">
              <FontAwesomeIcon
                onClick={() => handleComment({ clipTitle: title, clipId: id })}
                icon={faComment}
                className=" text-white text-2xl mr-1  cursor-pointer  "
              />
            </button>
          </div>
        </div>
      )}
      {!hide && <ReportSomething handleVisibillity={() => setHide(!hide)} />}
    </article>
  );
}

export default ClipVideoPlayer;
