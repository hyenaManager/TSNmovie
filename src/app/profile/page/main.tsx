"use client";
import { SkeletonSmClip } from "@/app/skeletons/skeletonClip";
import CatagoryNavbar from "../../components/streamers/catagoryOfMovie";
import { Suspense, lazy, useContext, useState } from "react";
import CreateClips from "@/app/components/clips/createClips";
import {
  CreateClipButton,
  CreateSeriesButton,
  EditProfileButton,
} from "@/app/components/floatingCreateBtn";
import AdminPage from "@/app/components/streamers/adminPage";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";
import { userProvider } from "@/app/context/userContext";
import { CreateSeries } from "@/app/components/series/createSeries";

const ClipList = lazy(() => import("../../components/streamers/clipList"));
const SeriesList = lazy(() => import("../../components/streamers/seriesList"));

export default function MainList() {
  const { userPage }: any = useContext(userProvider);
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
            <ClipList pageId={userPage?.id} />
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
          <div className=" relative">
            <SeriesList pageId={userPage?.id} />
            <CreateSeriesButton isCreating={() => setCreatingSomething(true)} />
            {creatingSomething && (
              <CreateSeries
                pageOwnerId={userPage?.id}
                handleVisibility={() => setCreatingSomething(false)}
              />
            )}
          </div>
        </Suspense>
      );
    } else {
      return <h3 className=" text-4xl"> Bruh</h3>;
    }
  };
  return (
    <>
      <Suspense fallback={<AdminSkeleton />}>
        <div className=" relative w-full">
          <AdminPage pageId={userPage?.id} />
          <EditProfileButton />
        </div>
      </Suspense>
      <div className=" pageWarper w-full relative min-h-[70vh]">
        <CatagoryNavbar setCurrentCatagory={handleCurrentCatagory} />
        {currentContent()}
      </div>
    </>
  );
}
