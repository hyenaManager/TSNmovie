"use client";
import {
  faComment,
  faHeart,
  faPause,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { timeSpliter } from "../myJs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "./feedApi";
type videoProps = {
  title: string;
  author: { name: string };
  video: string;
  id: number;
  like: number[];
};

function VideoPlayer({ title, author, video, id, like }: videoProps) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const [currentTime, setCurrentTime] = useState<number>(0); //currentTime of video
  const [duration, setDuration] = useState<number[]>([0, 0]); //first para is minute and second is minute
  const [volume, setVolume] = useState<number>(1); //volume of video
  const [hover, setHover] = useState<boolean>(false); //user is hovering video or not
  const [myCurrent, setMyCurrent] = useState<number[]>([]); // its mycurrent implementation of video current time
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
  const queryClient = useQueryClient();

  const { data: session, status } = useSession();

  const mutation = useMutation(
    async () => {
      if (like.includes(session?.user.id as number)) {
        await removeLike(id, session?.user.id as number, like);
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

  useEffect(() => {
    setDuration(timeSpliter(videoRef?.current?.duration));
    console.log("useEffect here!!");

    const interval = setInterval(() => {
      const [minute, second] = timeSpliter(videoRef?.current?.currentTime);
      setMyCurrent([minute, second]);
    });
    return () => clearInterval(interval);
  }, [isPlaying]);
  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
    videoRef.current &&
      (videoRef.current.volume = parseFloat(event.target.value));
  };
  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = parseFloat(event.target.value);
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  async function handleLike() {
    if (!session) {
      router.push("api/auth/signIn");
    }
  }

  return (
    <article
      className="video-player flex flex-col justify-center items-center w-5hundred p-3 relative rounded-lg mt-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        ref={videoRef}
        src={video}
        className=" h-5hundred flex justify-center "
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* show controls only when the user hovering over it */}
      {hover && (
        <div className="controls flex justify-center flex-col absolute bottom-1 p-3 left-0 right-0 w-full">
          <div className=" videoTime flex justify-center items-center">
            <div className=" text-white p-2">
              {myCurrent[0] + " : " + myCurrent[1]}
            </div>
            <input
              type="range"
              min="0"
              max={videoRef?.current?.duration}
              value={videoRef?.current?.currentTime}
              onChange={handleSeek}
              className=" cursor-pointer w-[350px] p-2"
            />
            <div className=" text-slate-50 p-2">
              {duration[0] + " : " + duration[1]}
            </div>
          </div>
          <div className=" flex justify-between p-1 items-center">
            <div className=" speaker flex justify-start items-center">
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className=" text-white text-lg pl-1"
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      )}
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
                  " text-white text-2xl p-1 cursor-pointer " +
                  (like.includes(session?.user.id as number) && "text-red-600")
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
