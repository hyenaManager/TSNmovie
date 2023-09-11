import React from "react";
import VideoComponent from "./videoComponent";

type videoPageProp = {
  title: string;
  poster: { name: string };
  video: string;
  id: number;
  like: number[];
};

export default function Feed() {
  return (
    <div className=" p-1 pt-14 flex justify-center">
      <VideoComponent />
    </div>
  );
}
