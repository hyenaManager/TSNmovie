import React from "react";
import { getFeedVideo } from "./feedApi";
import VideoComponent from "./videoComponent";
import FeedNotiSideBar from "./notification";

type videoPageProp = {
  title: string;
  poster: { name: string };
  video: string;
  id: number;
  like: number[];
};

export default function Feed() {
  return (
    <div className=" p-10 pt-14 flex justify-evenly">
      <VideoComponent />
      <FeedNotiSideBar />
    </div>
  );
}
