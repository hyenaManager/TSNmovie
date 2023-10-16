"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import DefaultVideoPlayer from "./videoPlayer";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import RoomVideoSkeleton, {
  RoomEpisodeSkeleton,
} from "@/app/skeletons/roomSkeletons";
import CreateEpisode from "@/app/components/episode/createEpisode";

export default function Pages() {
  const [episode, setEpisode] = useState({
    title: "",
    episode: 1,
    source: "",
    like: [0, 0],
    id: "",
  }); //selected episode that will define episode of video
  const [inputEpisode, setInputEpisode] = useState<number>(1); //for finding episode
  const [sectionIsHidden, setSectionIsHidden] = useState<boolean>(false); //section hidden and or show (section toggling)
  const episodeRef = useRef<Map<number, HTMLLIElement> | null>(null);
  const [creatingEpisode, setCreatingEpisode] = useState(false);
  const searchParams = useSearchParams();
  const seriesId = searchParams.get("seriesId") as string;
  const pageId = searchParams.get("pageOwnerId") as string;

  const { data, status } = useQuery({
    queryKey: ["series", seriesId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://yokeplay.vercel.app/api/series/${seriesId}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
  });
  const episodes = data?.episodes; //get episodes from series's data

  function scrollIntoEpisode(episode: number) {
    const map = getMap();
    const node = map.get(episode);

    node?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }

  function getMap() {
    if (!episodeRef.current) {
      // Initialize the Map on first usage.
      episodeRef.current = new Map();
    }
    return episodeRef.current;
  }
  useEffect(() => {
    if (episodes?.length !== 0) {
      setEpisode({
        title: episodes?.[0].name,
        episode: episodes?.[0].episodeNumber,
        source: episodes?.[0].video,
        like: episodes?.[0].like,
        id: episodes?.[0].id,
      });
    }
  }, [episodes]);

  return (
    <div className="flex xsm:flex-col sm:flex-row xsm:justify-start sm:justify-center min-h-[100vh]  text-white pageWarper sm:ml-3 sm:mr-3 xsm:ml-1 xsm:mr-1">
      <main className=" flex flex-col items-center xsm:pt-10 sm:pt-14 xsm:w-[97vw] sm:w-[95%] bg-black ">
        {status === "loading" ? (
          <RoomVideoSkeleton />
        ) : (
          <DefaultVideoPlayer
            videoSource={episode.source}
            episode={episode.episode}
            title={episode.title}
            image={data?.image}
            like={episode?.like}
            author={episodes?.author}
            id={episode.id}
            seriesId={seriesId}
          />
        )}
      </main>

      {status === "loading" ? (
        <RoomEpisodeSkeleton />
      ) : (
        <aside
          className={
            " xsm:w-[95vw] sm:w-[25vw] relative xsm:max-h-fit sm:max-h-[100vh] bg-black  text-black pt-16 rounded-md flex-col " +
            (sectionIsHidden ? " hidden " : " flex ")
          }
        >
          <div className="rounded-t-md absolute top-14 right-0 w-full p-2 flex justify-end items-center bg-white ">
            <FontAwesomeIcon
              onClick={() => setCreatingEpisode(true)}
              icon={faPlus}
              className=" w-[20px] h-[20px] bg-black border-2 border-green-400 p-2 rounded-full text-green-400 cursor-pointer"
            />
            <input
              type="number"
              value={inputEpisode}
              onChange={(e) => {
                setInputEpisode(parseInt(e.target.value));
                scrollIntoEpisode(parseInt(e.target.value));
              }}
              className=" bg-yellow-100 m-1 p-1 w-full outline-none appearance-none "
            />
            <FontAwesomeIcon
              onClick={() => scrollIntoEpisode(inputEpisode)}
              icon={faSearch}
              className=" w-[20px] h-[20px] bg-black border-2 border-fuchsia-400 p-2 rounded-full text-fuchsia-400 cursor-pointer"
            />
          </div>
          <ul className="pageWarper  xsm:w-[94vw] sm:w-[24vw] rounded-b-md  flex xsm:flex-row sm:flex-col w-full items-center overflow-auto mt-12 bg-white sm:h-[80vh] ">
            {episodes?.length !== 0 ? (
              episodes?.map(
                (Episode: {
                  id: string;
                  name: string;
                  video: string;
                  episodeNumber: number;
                  like: number[];
                }) => (
                  <li
                    key={Episode.episodeNumber}
                    className=" sm:w-[23vw] xsm:w-full flex xsm:justify-start  sm:justify-between p-2 items-center "
                    ref={(node) => {
                      const map = getMap();
                      if (node) {
                        map.set(Episode.episodeNumber, node);
                      } else {
                        map.delete(Episode.episodeNumber);
                      }
                    }}
                  >
                    <button
                      onClick={() =>
                        setEpisode({
                          title: Episode.name,
                          episode: Episode.episodeNumber,
                          source: Episode.video,
                          like: Episode.like,
                          id: Episode.id,
                        })
                      }
                      className=" bg-fuchsia-800 rounded-md p-2 text-white hover:bg-fuchsia-600"
                    >
                      Episode :{Episode.episodeNumber}
                    </button>
                    <span className=" xsm:hidden sm:block font-bold text-red-900 p-2">
                      {Episode.name}
                    </span>
                  </li>
                )
              )
            ) : (
              <h2 className="text-2xl text-black text-center w-full">
                No video avaiable
              </h2>
            )}
          </ul>
        </aside>
      )}

      {sectionIsHidden ? (
        <FontAwesomeIcon
          onClick={() => setSectionIsHidden(!sectionIsHidden)}
          title="show section"
          icon={faAnglesLeft}
          className="cursor-pointer text-white w-[35px] h-[35px] bg-fuchsia-600 p-2 flex justify-center items-center rounded-full bottom-2 right-2 fixed"
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => setSectionIsHidden(!sectionIsHidden)}
          title="hide section"
          icon={faAnglesRight}
          className="cursor-pointer text-white w-[35px] h-[35px] bg-fuchsia-600 p-2 flex justify-center items-center rounded-full bottom-2 right-2 fixed"
        />
      )}
      <Link
        href={`/profile/page`}
        className=" fixed bottom-0 left-0 bg-fuchsia-600 text-xl text-black flex items-center p-2 rounded-tr-md"
      >
        <h3 className="text-center">Back to Page</h3>
      </Link>
      {creatingEpisode && (
        <CreateEpisode
          seriesId={seriesId}
          key={"new"}
          handleVisibility={() => setCreatingEpisode(false)}
        />
      )}
    </div>
  );
}
