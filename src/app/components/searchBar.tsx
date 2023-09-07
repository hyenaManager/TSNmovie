"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageSearchBar() {
  return (
    <>
      <div className=" flex justify-end items-center absolute top-12 text-fuchsia-500 opacity-80  right-4">
        <input
          type="text"
          className=" p-1 border-b-2 border-white bg-black m-2 outline-none"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className=" p-2  text-white m-1 rounded-md fixed"
        />
      </div>
    </>
  );
}
export function MovieSearchBar() {
  return (
    <>
      <div className=" flex justify-end items-center absolute top-[100px] text-fuchsia-500 opacity-80  right-4">
        <input
          type="text"
          className=" p-1 border-b-2 border-slate-500 bg-none m-2 outline-none"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className=" p-2 text-fuchsia-700 m-1 rounded-md fixed"
        />
      </div>
    </>
  );
}
