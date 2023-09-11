"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../../pageApi";
import DefaultVideoPlayer from "./videoPlayer";

type pageProps = {
  params: { id: number; author: string };
};

export default function Pages({ params }: pageProps) {
  const [episode, setEpisode] = useState({
    title: "",
    episode: 1,
    source: "",
    like: [0, 0],
  }); //selected episode that will define episode of video
  const [inputEpisode, setInputEpisode] = useState<number>(1); //for finding episode
  const [sectionIsHidden, setSectionIsHidden] = useState<boolean>(false); //section hidden and or show (section toggling)
  const episodeRef = useRef<Map<number, HTMLLIElement> | null>(null);
  const url = `http://localhost:5000/series/${params.id}`;
  const { data, status } = useQuery({
    queryKey: ["series", params.id],
    queryFn: () => getSeries(url),
  });
  const episodes = data?.episodes;
  // console.log("episodes from api", episodes);

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
    if (episodes) {
      setEpisode({
        title: episodes[0]?.name,
        episode: episodes[0]?.episode,
        source: episodes[0]?.source,
        like: episodes[0]?.like,
      });
    }
  }, [episodes]);

  return (
    <div className=" flex justify-center text-white pageWarper">
      <main className=" flex flex-col items-center pt-14 w-[75vw] bg-black ">
        <DefaultVideoPlayer
          videoSource={episode.source}
          episode={episode.episode}
          title={episode.title}
          image={data?.image}
          like={episode?.like}
          author={params.author}
        />
      </main>
      <aside
        className={
          " w-[25vw] max-h-[100vh] bg-black text-black pt-16 rounded-md flex-col  " +
          (sectionIsHidden ? " hidden " : " flex ")
        }
      >
        <div className=" fixed p-2 flex justify-between items-center bg-white ">
          <h2 className=" text-xl">Episode</h2>
          <input
            type="number"
            value={inputEpisode}
            onChange={(e) => setInputEpisode(parseInt(e.target.value))}
            className=" bg-yellow-100 m-1 p-1 "
          />
          <FontAwesomeIcon
            onClick={() => scrollIntoEpisode(inputEpisode)}
            icon={faSearch}
            className=" bg-fuchsia-500 hover:bg-fuchsia-600 p-2 rounded-sm text-white cursor-pointer"
          />
        </div>
        <ul className=" flex flex-col w-full items-center overflow-auto mt-12 bg-white max-h-[84vh] ">
          {episodes?.map(
            (Episode: {
              episode: number;
              name: string;
              source: string;
              like: number[];
            }) => (
              <li
                key={Episode.episode}
                className=" w-full flex justify-between p-2 items-center "
                ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(Episode.episode, node);
                  } else {
                    map.delete(Episode.episode);
                  }
                }}
              >
                <button
                  onClick={() =>
                    setEpisode({
                      title: Episode.name,
                      episode: Episode.episode,
                      source: Episode.source,
                      like: Episode.like,
                    })
                  }
                  className=" bg-fuchsia-800 rounded-md p-2 text-white hover:bg-fuchsia-600"
                >
                  Episode :{Episode.episode}
                </button>
                <span className=" font-bold text-red-900 p-2">
                  {Episode.name}
                </span>
              </li>
            )
          )}
        </ul>
      </aside>

      {sectionIsHidden ? (
        <FontAwesomeIcon
          onClick={() => setSectionIsHidden(!sectionIsHidden)}
          title="show section"
          icon={faList}
          className="cursor-pointer text-white w-[35px] h-[35px] bg-fuchsia-600 p-2 flex justify-center items-center rounded-full bottom-2 right-2 fixed"
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => setSectionIsHidden(!sectionIsHidden)}
          title="hide section"
          icon={faXmark}
          className="cursor-pointer text-white w-[35px] h-[35px] bg-fuchsia-600 p-2 flex justify-center items-center rounded-full bottom-2 right-2 fixed"
        />
      )}
    </div>
  );
}
