"use client";
import { SkeletonSmClip } from "@/app/skeletons/skeletonClip";
import CatagoryNavbar from "../../components/streamers/catagoryOfMovie";
import { Suspense, lazy, useState } from "react";
import CreateClips from "@/app/components/clips/createClips";
import { CreateClipButton } from "@/app/components/clips/floatingCreateBtn";

const ClipList = lazy(() => import("../../components/streamers/clipList"));
const SeriesList = lazy(() => import("../../components/streamers/seriesList"));

export default function MainList({ pageId }: { pageId: string }) {
  const [currentCatagory, setCurrentCatagory] = useState("clips");
  const [creatingSomething, setCreatingSomething] = useState(false);
  const handleCurrentCatagory = (catagory: string) => {
    setCurrentCatagory(catagory);
  };
  const currentContent = () => {
    if (currentCatagory === "clips") {
      return (
        <Suspense fallback={<SkeletonSmClip />}>
          <div className=" relative">
            <ClipList pageId={pageId} />
            <CreateClipButton isCreating={() => setCreatingSomething(true)} />
            {creatingSomething && (
              <CreateClips isCreating={() => setCreatingSomething(false)} />
            )}
          </div>
        </Suspense>
      );
    }
    if (currentCatagory === "series") {
      return (
        <Suspense>
          <SeriesList pageId={pageId} />
        </Suspense>
      );
    } else {
      return <h3 className=" text-4xl"> Bruh</h3>;
    }
  };
  return (
    <div className=" pageWarper relative min-h-[70vh]">
      <CatagoryNavbar setCurrentCatagory={handleCurrentCatagory} />
      {currentContent()}
    </div>
  );
}
