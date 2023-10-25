"use client";
import {
  faComment,
  faHeart,
  faPlay,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import Image from "next/image";
import ReportSomething from "../components/reportComponent";
import { useInView } from "react-hook-inview";

import axios from "axios";
import toast from "react-hot-toast";

import MoreOption from "../components/clips/moreOption";
import SkeletonClip, { SkeletonClipError } from "../skeletons/skeletonClip";
import { catchingError } from "../utility/catchingError";
import { error } from "console";
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

function ClipVideoPlayer({ id, handleComment }: videoProps) {
  const { data: session } = useSession();
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const [hide, setHide] = useState(true); //is report widget or page is hide or not
  const queryClient = useQueryClient();
  const [readMore, setReadMore] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { data, status, error } = useQuery({
    queryKey: ["clip", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://yokeplay.vercel.app/api/clips/oneClip?clipId=${id}`
        );
        return response.data;
      } catch (error: any) {
        const errorMessage = catchingError(error.response.status);
        toast.error(errorMessage as string);
      }
    },
  });

  const isLiked =
    data?.likes?.find((user: any) => user.id === session?.user.id) !==
    undefined; //check current video is already liked by current user?

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
      `https://yokeplay.vercel.app/api/notifications`,
      {
        message: `${session?.user.firstName} like your clip`,
        type: "like",
        holder: "clip",
        userEmail: session?.user.email,
        userId: data?.createdBy?.adminId,
        holderId: id,
      }
    );
    if (response.status === 500) {
      toast.error(response.statusText);
    }
  };

  //adding like or remove like
  // console.log(` isLiked value for ${data?.title} is :`, isLiked);

  const handleLike = async () => {
    const type = isLiked ? "removeLike" : "addLike"; //if user already liked, remove the the like or add  the like
    console.log(`type for ${data?.title} is : `, type);
    const response = await axios.put(
      `https://yokeplay.vercel.app/api/clips/like?clipId=${id}&userId=${session?.user.id}&type=${type}&pageId=${data?.createdBy.id}`
    );
    if (response.status === 200) {
      toast.success(response.data);
      type === "addLike" && handleCreatNotification();
    }
  };
  const mutation = useMutation({
    mutationFn: handleLike,
    onMutate: async () => {
      await queryClient.cancelQueries(["clip", id]);
      const previousClip: any = queryClient.getQueryData<any>(["clip", id]);
      if (!isLiked) {
        queryClient.setQueryData(["clip", id], {
          ...previousClip,
          likes: [...previousClip.likes, session?.user],
        });
      } else {
        queryClient.setQueryData(["clip", id], {
          ...previousClip,
          likes: previousClip.likes.filter(
            (user: any) => user.id !== session?.user.id
          ),
        });
      }
      console.log("is current clip", previousClip);

      return previousClip;
    },
    onError: (_error: any, context: any) => {
      queryClient.setQueryData(["clip", id], () => context.previousClip);
      // console.log(_error, "is error");
      // const errorMessage = catchingError(_error.response.status as number);
      // toast.error(errorMessage as string);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["clip", id]);
    },
  });
  if (status === "loading") return <SkeletonClip />;

  return (
    <article
      ref={ref}
      className=" video-player flex flex-col justify-center items-center xsm:w-[100vw] sm:w-[600px] relative rounded-lg mt-2"
    >
      <video
        ref={videoRef}
        src={data?.video}
        className=" h-5hundred flex justify-center rounded-xl "
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlayPause}
        key={data?.video}
      />

      {/* cover video with purble bars, disabled only when the use play the video */}
      {!isPlaying && (
        <div className=" absolute top-0 left-0 xsm:w-[100vw] sm:w-full h-full z-10 xsm:rounded-none sm:rounded-xl flex flex-col justify-between items-center ">
          {/* user profile and more option button and  blah blah */}
          <section
            className={
              " w-full bg-fuchsia-600 rounded-t-lg flex flex-col " +
              (readMore ? " min-w-fit" : "h-1hundred")
            }
          >
            <div className="profileDiv flex justify-between items-center">
              <Link
                href={`/streamers/${data?.createdBy?.id}`}
                className=" flex justify-start items-center m-1"
              >
                <Image
                  src={data?.createdBy?.image || "/defaultProfile.jpeg"}
                  width={100}
                  height={100}
                  alt="bruh"
                  className=" w-[50px] h-[50px] object-cover rounded-full bg-gray-400 mr-2 cursor-pointer"
                />
                <h4 className=" text-lg text-slate-400 cursor-pointer">
                  {data?.createdBy?.name}
                </h4>
              </Link>
              {/* this is moreOption  */}
              <MoreOption
                setHide={() => setHide(false)}
                clipId={id}
                pageOwnerId={data?.pageOwnerId}
                video={data?.video}
              />
            </div>
            <pre
              className={
                " text-sm text-slate-100 text-start items-center relative m-1 " +
                (!readMore &&
                  data?.title &&
                  data?.title.split("").length > 40 &&
                  " line-clamp-1")
              }
            >
              {readMore ? data?.title : data?.title?.substring(0, 40)}
              {data?.title && data?.title.split("").length > 40 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className=" text-start items-center text-white absolute right-0 top-0"
                >
                  {readMore ? "readless" : "readmore"}
                </button>
              )}
            </pre>
          </section>
          {!error ? (
            <FontAwesomeIcon
              icon={faPlay}
              onClick={handlePlayPause}
              className=" text-4xl text-fuchsia-600 cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-4xl text-fuchsia-600 "
              spin
            />
          )}
          <div className=" h-1hundred w-full bg-fuchsia-600 rounded-b-lg flex justify-between items-center">
            <div className=" m-4 flex justify-center items-center">
              <FontAwesomeIcon
                onClick={() => {
                  mutation.mutate(data);
                }}
                icon={faHeart}
                className={
                  " text-2xl p-1 cursor-pointer " +
                  (isLiked ? " text-red-600" : " text-white")
                }
              />
              <span className=" text-white">{data?.likes.length}</span>
            </div>
            <button className="flex justify-center m-4 items-center">
              <FontAwesomeIcon
                onClick={() =>
                  handleComment({
                    clipTitle: data?.title,
                    clipId: id,
                    adminId: data?.createdBy.adminId,
                  })
                }
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
