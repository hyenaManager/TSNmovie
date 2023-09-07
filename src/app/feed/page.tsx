import React from "react";
import VideoPlayer from "./feedVideo";

export default function Feed() {
  return (
    <main className=" p-10 pt-14">
      <div className=" flex flex-col justify-center items-center overflow-auto">
        <VideoPlayer videoSource={"/titoks/thai.mp4"} />
      </div>
    </main>
  );
}
