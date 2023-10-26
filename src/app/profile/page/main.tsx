"use client";
import CatagoryNavbar from "../../components/streamers/catagoryOfMovie";
import { Suspense, lazy, useContext, useState } from "react";
import {
  CreateSomethingButton,
  EditProfileButton,
} from "@/app/components/floatingCreateBtn";
import AdminPage from "@/app/components/streamers/adminPage";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";
import { userProvider } from "@/app/context/userContext";
const CreateClips = lazy(() => import("@/app/components/clips/createClips"));
const CreateSeries = lazy(() => import("@/app/components/series/createSeries"));
import { useCatagory } from "@/app/store";

const ClipList = lazy(() => import("../../components/streamers/clipList"));
const SeriesList = lazy(() => import("../../components/streamers/seriesList"));

export default function MainList() {
  const { userPage }: any = useContext(userProvider);
  const [creatingSomething, setCreatingSomething] = useState(false);
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
          <CreateSomethingButton
            isCreating={() => setCreatingSomething(true)}
          />
          {creatingSomething && (
            <Suspense>
              <CreateClips isCreating={() => setCreatingSomething(false)} />
            </Suspense>
          )}
        </div>
      );
    }
    if (currentCatagory === "series") {
      return (
        <div className=" relative">
          <SeriesList pageId={userPage?.id} />
          <CreateSomethingButton
            isCreating={() => setCreatingSomething(true)}
          />
          {creatingSomething && (
            <CreateSeries
              pageOwnerId={userPage?.id}
              handleVisibility={() => setCreatingSomething(false)}
            />
          )}
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
