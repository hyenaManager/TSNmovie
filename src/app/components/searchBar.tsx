"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageSearchBar() {
  return (
    <button className=" flex z-30 justify-end p-3 bg-white items-center rounded-lg relative text-fuchsia-600 ">
      <input type="text" className=" border-black outline-none" />
      <FontAwesomeIcon
        icon={faSearch}
        className=" w-[20px] h-[20px] text-black "
      />
    </button>
  );
}

export function MovieSearchBar() {
  return (
    <>
      <div className=" flex justify-end items-center fixed top-[100px] text-fuchsia-500 opacity-80  right-4">
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
