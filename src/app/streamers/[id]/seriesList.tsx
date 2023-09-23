"use client";
import { Suspense, useState } from "react";
import { SkeletonSmClip } from "@/app/skeletons/skeletonClip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SeriesImgSkeleton from "@/app/skeletons/seriesSkeleton";
import SeriesImage from "./seriesComponent";
import { SeriesOverview } from "./seriesComponent";
import { AnimatePresence } from "framer-motion";

type seriesProps = {
  id: string;
  title: string;
  name: string;
  content: string | null;
  video: string | null;
  likes: string[];
  createAt: Date;
  updateAt: Date;
  image: string;
  pageOwnerId: string;
  pageImage: string;
  page: { id: string; name: string; adminId: string };
  createdBy: any;
};
export default function SeriesList({ pageId }: { pageId: string }) {
  const [isCheckingSeries, setIsCheckingSeries] = useState(false); //if true show the serieOverview component else hide
  const [selectedSeries, setSelectedSeries] = useState<any>(null); //object of series that user selected to view, data is set from series image componetn

  const { data, status, error } = useQuery({
    queryKey: ["page", pageId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://yokeplay.vercel.app/api/pages/${pageId}`
        );

        return response.data;
      } catch (error) {
        alert(error);
        return error;
      }
    },
    retryDelay: 2000,
    retry: 3,
  });
  const handleSelectedSeries = (series: any) => {
    setSelectedSeries(series); //set series , this is set from seriesImage
  };
  const series = data?.series; //destruturing clips from data
  console.log("this is episodes from series list: ", data?.episodes);

  if (error || status === "error")
    return (
      <div className=" w-full h-3hundred flex justify-center items-center">
        <h3 className=" text-4xl text-red-400 m-2 uppercase">
          Opps something went wrong
        </h3>
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          className=" w-[40px] cursor-pointer h-[40px] text-red-200"
        />
      </div>
    );
  return (
    <>
      <section>
        <div className=" pageWarper grid gap-3 xsm:grid-cols-3 p-2 sm:grid-cols-5 ">
          {status === "loading" &&
            [1, 2, 3, 4].map((number) => <SeriesImgSkeleton key={number} />)}
          {series?.map((serie: seriesProps) => (
            <Suspense fallback={<SeriesImgSkeleton />} key={serie.id}>
              <SeriesImage
                {...serie}
                chosenSeries={handleSelectedSeries}
                isChecking={() => setIsCheckingSeries(!isCheckingSeries)}
              />
            </Suspense>
          ))}
        </div>
        <AnimatePresence>
          {isCheckingSeries && (
            <SeriesOverview
              {...selectedSeries}
              pageOwnerId={pageId}
              handleVisibility={() => setIsCheckingSeries(!isCheckingSeries)}
            />
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
