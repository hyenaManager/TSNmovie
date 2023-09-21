"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
// import { useQuery } from "@tanstack/react-query";
import DefaultVideoPlayer from "./videoPlayer";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import RoomVideoSkeleton, {
  RoomEpisodeSkeleton,
} from "@/app/skeletons/roomSkeletons";

export default function Pages() {
  const [episode, setEpisode] = useState({
    title: "",
    episode: 1,
    source: "",
    like: [0, 0],
  }); //selected episode that will define episode of video
  const [inputEpisode, setInputEpisode] = useState<number>(1); //for finding episode
  const [sectionIsHidden, setSectionIsHidden] = useState<boolean>(false); //section hidden and or show (section toggling)
  const episodeRef = useRef<Map<number, HTMLLIElement> | null>(null);
  const searchParams = useSearchParams();
  const seriesId = searchParams.get("seriesId") as string;
  const pageId = searchParams.get("pageOwnerId") as string;

  const { data, status } = useQuery({
    queryKey: ["series", seriesId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/series/${seriesId}`
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
      });
    }
  }, [episodes]);

  return (
    <div className=" flex justify-center h-[100vh]  text-white pageWarper ml-3 mr-3">
      <main className=" flex flex-col items-center pt-14 w-[75vw] bg-black ">
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
            videoLink={episode.source}
          />
        )}
      </main>

      {status === "loading" ? (
        <RoomEpisodeSkeleton />
      ) : (
        <aside
          className={
            " w-[25vw] relative max-h-[100vh] bg-black  text-black pt-16 rounded-md flex-col  " +
            (sectionIsHidden ? " hidden " : " flex ")
          }
        >
          <div className="rounded-t-md absolute top-14 right-0 w-full p-2 flex justify-end items-center bg-white ">
            <input
              type="number"
              value={inputEpisode}
              onChange={(e) => {
                setInputEpisode(parseInt(e.target.value));
                scrollIntoEpisode(parseInt(e.target.value));
              }}
              className=" bg-yellow-100 m-1 p-1 outline-none appearance-none w-full"
            />
            <FontAwesomeIcon
              onClick={() => scrollIntoEpisode(inputEpisode)}
              icon={faSearch}
              className=" w-[20px] h-[20px] bg-black border-2 border-fuchsia-400 p-2 rounded-full text-fuchsia-400 cursor-pointer"
            />
          </div>
          <ul className=" rounded-b-md flex flex-col w-full items-center overflow-auto mt-12 bg-white h-[80vh] ">
            {episodes?.length !== 0 &&
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
                    className=" w-full flex justify-between p-2 items-center "
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
                        })
                      }
                      className=" bg-fuchsia-800 rounded-md p-2 text-white hover:bg-fuchsia-600"
                    >
                      Episode :{Episode.episodeNumber}
                    </button>
                    <span className=" font-bold text-red-900 p-2">
                      {Episode.name}
                    </span>
                  </li>
                )
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
        href={`/streamers/${pageId}`}
        className=" fixed bottom-0 left-0 bg-fuchsia-600 text-xl text-black flex items-center p-2 rounded-tr-md"
      >
        <h3 className="text-center">Back to Page</h3>
      </Link>
    </div>
  );
}
