"use client";
import CatagoryNavbar from "./catagoryOfMovie";
import { Suspense, lazy, useState } from "react";

const ClipList = lazy(() => import("./clipList"));
const SeriesList = lazy(() => import("./seriesList"));

export default function MainList() {
  const [currentCatagory, setCurrentCatagory] = useState("clips");
  const handleCurrentCatagory = (catagory: string) => {
    setCurrentCatagory(catagory);
  };
  const currentContent = () => {
    if (currentCatagory === "clips") {
      return (
        <Suspense>
          <ClipList />
        </Suspense>
      );
    }
    if (currentCatagory === "series") {
      return (
        <Suspense>
          <SeriesList />
        </Suspense>
      );
    } else {
      return <h3 className=" text-4xl"> Bruh</h3>;
    }
  };
  return (
    <div className=" pageWarper relative ">
      <CatagoryNavbar setCurrentCatagory={handleCurrentCatagory} />
      {currentContent()}
    </div>
  );
}
