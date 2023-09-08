"use client";
import { timeSpliter } from "@/app/myJs";
import {
  faEllipsisVertical,
  faPause,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
type videoProps = {
  videoSource: string;
  title: string;
  episode: number;
};

function PageVideoPlayer({ videoSource, title, episode }: videoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //video is playing or not
  const [currentTime, setCurrentTime] = useState<number>(0); //currentTime of video

  const [duration, setDuration] = useState<number[]>([0, 0]); //first para is minute and second is minute
  const [volume, setVolume] = useState<number>(1); //volume of video
  const [hover, setHover] = useState<boolean>(false); //user is hovering video or not
  const [myCurrent, setMyCurrent] = useState<number[]>([]); // its mycurrent implementation of video current time
  const videoRef = useRef<HTMLVideoElement | null>(null); // for nesting in video dom
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

  return (
    <div
      className="video-player flex flex-col justify-center items-center p-3 relative rounded-lg mt-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        ref={videoRef}
        src={videoSource}
        className=" h-5hundred flex justify-center shadow-[0_0_30px_purple]"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* show controls only when the user hovering over it */}
      {hover && (
        <div className="controls flex justify-center flex-col absolute bottom-1 p-3 left-0 right-0 w-full">
          <div className=" videoTime flex justify-between items-center text-xl">
            {/* video current time */}
            <div className=" text-white p-2">
              {myCurrent[0] + " : " + myCurrent[1]}
            </div>
            {/* video time range */}
            <input
              type="range"
              min="0"
              max={videoRef?.current?.duration}
              value={videoRef?.current?.currentTime}
              onChange={handleSeek}
              className=" cursor-pointer w-[80%] p-2"
            />
            {/* video total duration */}
            <div className=" text-slate-50 p-2">
              {duration[0] + " : " + duration[1]}
            </div>
          </div>
          <div className=" flex justify-between p-1 items-center">
            <div className=" speaker flex justify-start items-center">
              {/* video volume controller icon */}

              <FontAwesomeIcon
                icon={faVolumeHigh}
                className=" text-lg pl-1 text-fuchsia-600 cursor-pointer"
              />

              {/* video volume range */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className=" text-fuchsia-900 bg-fuchsia-700"
              />
            </div>
          </div>
        </div>
      )}
      {/* cover video with white bars disabled only when the use play */}
      {!isPlaying ? (
        <div className=" absolute top-0 left-0 w-full h-full z-20 rounded-xl flex flex-col justify-between ">
          {/* user profile and link blah blah */}
          <div className=" h-1hundred bg-fuchsia-600  rounded-t-lg flex justify-between items-center ">
            <Image
              width={60}
              height={60}
              alt="bruh"
              className=" rounded-full bg-gray-400 ml-3 mr-2 cursor-pointer "
              src="/luffy.jpg"
            />
            <h4 className=" text-lg text-slate-900 font-bold ">
              {title} - Episode : {episode}
            </h4>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className=" text-white w-[30px] h-[30px] cursor-pointer p-2"
            />
          </div>
          <FontAwesomeIcon
            icon={faPlay}
            onClick={handlePlayPause}
            className=" text-4xl text-fuchsia-600 cursor-pointer"
          />
          <div className=" h-1hundred bg-fuchsia-600  rounded-b-lg flex justify-center">
            <p className=" text-white text-4xl">Luffy vs Kaido</p>
          </div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faPause}
          onClick={handlePlayPause}
          className=" absolute top-6 right-6 text-4xl text-fuchsia-600 cursor-pointer"
        />
      )}
    </div>
  );
}
export default PageVideoPlayer;
