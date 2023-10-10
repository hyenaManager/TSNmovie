"use client";

import {
  faCoins,
  faEye,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function GetPageByItsUnique({
  changeUnique,
}: {
  changeUnique: (type: string) => void;
}) {
  return (
    <aside className=" sm:w-[27vw] xsm:w-full  sm:h-[100vh] bg-slate-950 pt-14 p-2 ">
      <ul className="pageWarper w-full flex xsm:flex-row sm:flex-col justify-center xsm:text-sm sm:text-2xl text-white mt-3 ">
        <li
          onClick={() => changeUnique("mostViewed")}
          className=" w-full m-1 p-3 text-center cursor-pointer hover:bg-fuchsia-500 rounded-t-xl rounded-br-xl border-2 border-fuchsia-500 items-center flex xsm:flex-col sm:flex-row xsm:justify-center sm:justify-between"
        >
          <span>Most viewed</span>
          <FontAwesomeIcon
            icon={faEye}
            className=" w-[20px] h-[20px] text-red-400"
          />
        </li>
        <li className=" w-full m-1 p-3 text-center cursor-pointer hover:bg-fuchsia-500 rounded-t-xl rounded-br-xl border-2 border-fuchsia-500 items-center flex xsm:flex-col sm:flex-row xsm:justify-center sm:justify-between">
          <span>Bounty Hunter</span>
          <FontAwesomeIcon
            icon={faCoins}
            className=" w-[20px] h-[20px] text-yellow-700"
          />
        </li>
        <li
          onClick={() => changeUnique("mostRated")}
          className=" w-full m-1 p-3 text-center cursor-pointer hover:bg-fuchsia-500 rounded-t-xl rounded-br-xl border-2 border-fuchsia-500 items-center flex xsm:flex-col sm:flex-row xsm:justify-center sm:justify-between"
        >
          <span>Most Rated</span>
          <FontAwesomeIcon
            icon={faStar}
            className=" w-[20px] h-[20px] text-yellow-400"
          />
        </li>
        <li className=" w-full m-1 p-3 text-center cursor-pointer hover:bg-fuchsia-500 rounded-t-xl rounded-br-xl border-2 border-fuchsia-500 items-center flex xsm:flex-col sm:flex-row xsm:justify-center sm:justify-between">
          <span>Most Liked</span>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className=" w-[20px] h-[20px] text-green-400"
          />
        </li>
      </ul>
    </aside>
  );
}
