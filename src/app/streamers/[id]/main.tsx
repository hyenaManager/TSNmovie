"use client";
import CatagoryNavbar from "./catagoryOfMovie";
import { Suspense, lazy, useState } from "react";

const ClipList = lazy(() => import("./clipList"));
const SeriesList = lazy(() => import("./seriesList"));

export default function MainList({ pageId }: { pageId: string }) {
  const [currentCatagory, setCurrentCatagory] = useState("clips");
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
