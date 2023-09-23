import React from "react";
import VideoComponent from "./videoComponent";
import CreateButton from "./floatingCreateBtn";

type videoPageProp = {
  title: string;
  poster: { name: string };
  video: string;
  id: number;
  like: number[];
};

export default function ClipPage() {
  return (
    <div className="pageWarper p-1 pt-14 flex justify-center">
      <VideoComponent />
    </div>
  );
}
