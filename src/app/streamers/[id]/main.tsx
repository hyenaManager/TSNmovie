"use client";
import { useStore } from "zustand";
import CatagoryNavbar from "../../../components/streamers/catagoryOfMovie";
import { Suspense, lazy, useState } from "react";
import { useCatagory } from "@/app/store";

const ClipList = lazy(() => import("../../../components/streamers/clipList"));
const SeriesList = lazy(
  () => import("../../../components/streamers/seriesList")
);

export default function MainList({ pageId }: { pageId: string }) {
  const currentCatagory = useCatagory((state: any) => state.currentCatagory);
  const setCurrentCatagory: any = useCatagory(
    (state: any) => state.changeCurrentCatagory
  );
  const handleCurrentCatagory = (catagory: string) => {
    setCurrentCatagory(catagory);
  };
  const currentContent = () => {
    if (currentCatagory === "clips") {
      return (
        <Suspense>
          <ClipList pageId={pageId} />
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
      return (
        <h3 className=" text-4xl"> Movie mode is unavailable at the moment</h3>
      );
    }
  };
  return (
    <div className=" pageWarper relative min-h-[70vh] w-full">
      <CatagoryNavbar setCurrentCatagory={handleCurrentCatagory} />
      {currentContent()}
    </div>
  );
}
