"use client";
import React, { useRef, useState } from "react";
import PageVideoPlayer from "./videoPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

type pageProps = {
  params: { name: string };
};
let name: string = "ling";
export default function Pages({ params }: pageProps) {
  const [episode, setEpisode] = useState<number>(1); //selected episode that will define episode of video
  const [inputEpisode, setInputEpisode] = useState<number>(1); //for finding episode
  const [sectionIsHidden, setSectionIsHidden] = useState<boolean>(false); //section hidden and or show (section toggling)
  const episodeRef = useRef<Map<number, HTMLLIElement> | null>(null);

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

  const name = params.name;
  return (
    <main className=" flex justify-center text-white relative ">
      <div className=" flex flex-col items-center min-h-[100vh] pt-14 w-full bg-black relative">
        {/* <nav className=" absolute top-14 left-0 right-0 ">This is page nav</nav> */}
        <PageVideoPlayer
          videoSource={"/tiktok/bgirl2.mp4"}
          title={name}
          episode={episode}
        />
      </div>
      <section
        className={
          " w-5hundred max-h-[100vh] bg-black text-black pt-14 flex-col  " +
          (sectionIsHidden ? " hidden " : " flex ")
        }
      >
        <div className=" fixed p-2 flex justify-between items-center bg-white ">
          <div className=" text-2xl">Episode</div>
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
          {Array.from({ length: 1050 }, (_, i) => i + 1).map((Episode) => (
            <li
              key={Episode}
              className=" w-full flex justify-between p-2 items-center "
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(Episode, node);
                } else {
                  map.delete(Episode);
                }
              }}
            >
              <button
                onClick={() => setEpisode(Episode)}
                className=" bg-fuchsia-800 rounded-md p-2 text-white hover:bg-fuchsia-600"
              >
                Episode :{Episode}
              </button>
              <span className=" font-bold text-red-900 p-2">
                Luffy vs Kaido
              </span>
            </li>
          ))}
        </ul>
      </section>

      {sectionIsHidden ? (
        <FontAwesomeIcon
          onClick={() => setSectionIsHidden(!sectionIsHidden)}
          title="show section"
          icon={faList}
          className="cursor-pointer text-white w-[35px] h-[35px] bg-fuchsia-600 p-2 flex justify-center items-center rounded-full bottom-2 right-2 absolute"
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => setSectionIsHidden(!sectionIsHidden)}
          title="hide section"
          icon={faXmark}
          className="cursor-pointer text-white w-[35px] h-[35px] bg-fuchsia-600 p-2 flex justify-center items-center rounded-full bottom-2 right-2 absolute"
        />
      )}
    </main>
  );
}
