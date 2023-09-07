"use client";
import React from "react";
import VideoPlayer from "./feedVideo";
import { SessionProvider } from "next-auth/react";

export default function Feed() {
  return (
    <main className=" p-10 pt-14">
      <div className=" flex flex-col justify-center items-center overflow-auto">
        <SessionProvider>
          <VideoPlayer videoSource={"/titoks/thai.mp4"} />
        </SessionProvider>
      </div>
    </main>
  );
}
