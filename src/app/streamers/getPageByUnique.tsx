"use client";

import {
  faCoins,
  faEye,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GetPageByItsUnique() {
  return (
    <>
      <ul className=" w-full flex flex-col justify-center text-2xl text-black">
        <li className=" w-[90%] p-3 text-center cursor-pointer hover:bg-fuchsia-500 hover:text-white items-center flex justify-between">
          <span>Most viewed</span>
          <FontAwesomeIcon
            icon={faEye}
            className=" w-[20px] h-[20px] text-red-400"
          />
        </li>
        <li className=" w-[90%] p-3 text-center cursor-pointer hover:bg-fuchsia-500 hover:text-white items-center flex justify-between">
          <span>Bounty Hunter</span>
          <FontAwesomeIcon
            icon={faCoins}
            className=" w-[20px] h-[20px] text-yellow-700"
          />
        </li>
        <li className=" w-[90%] p-3 text-center cursor-pointer hover:bg-fuchsia-500 hover:text-white items-center flex justify-between">
          <span>Most Rated</span>
          <FontAwesomeIcon
            icon={faStar}
            className=" w-[20px] h-[20px] text-yellow-400"
          />
        </li>
        <li className=" w-[90%] p-3 text-center cursor-pointer hover:bg-fuchsia-500 hover:text-white items-center flex justify-between">
          <span>Most Liked</span>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className=" w-[20px] h-[20px] text-green-400"
          />
        </li>
      </ul>
    </>
  );
}
