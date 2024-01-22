"use client";
import CatagoryNavbar from "../../../components/streamers/catagoryOfMovie";
import { Suspense, lazy, useContext, useState } from "react";
import {
  CreateSomethingButton,
  EditProfileButton,
} from "../../../components/floatingCreateBtn";
import AdminPage from "../../../components/streamers/adminPage";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";
import { userProvider } from "@/app/context/userContext";
import { useCatagory } from "@/app/store";
import { NProgressLink } from "@/components/customLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ClipList = lazy(() => import("../../../components/streamers/clipList"));
const SeriesList = lazy(
  () => import("../../../components/streamers/seriesList")
);

export default function MainList() {
  const { userPage }: any = useContext(userProvider);
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
        <div className=" relative">
          <ClipList pageId={userPage?.id} />
          <NProgressLink
            className={
              "absolute xsm:top-0 xsm:left-0 z-20 sm:bottom-9 sm:right-10"
            }
            href={"/profile/page/createClip"}
          >
            <button
              title="create "
              className="p-2 flex justify-center  xsm:w-[50px] xsm:h-[30px] sm:w-[70px] sm:h-[40px] bg-green-500 rounded-br-lg text-white items-center"
            >
              new
              <FontAwesomeIcon icon={faPlus} className="w-[15px] h-[15px]" />
            </button>
          </NProgressLink>
        </div>
      );
    }
    if (currentCatagory === "series") {
      return (
        <div className=" relative">
          <SeriesList pageId={userPage?.id} />
          <NProgressLink
            className={
              "absolute xsm:top-0 xsm:left-0 z-20 sm:bottom-9 sm:right-10"
            }
            href={"/profile/page/createSeries"}
          >
            <button
              title="create "
              className="p-2 flex justify-center  xsm:w-[50px] xsm:h-[30px] sm:w-[70px] sm:h-[40px] bg-green-500 rounded-br-lg text-white items-center"
            >
              new
              <FontAwesomeIcon icon={faPlus} className="w-[15px] h-[15px]" />
            </button>
          </NProgressLink>
        </div>
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
