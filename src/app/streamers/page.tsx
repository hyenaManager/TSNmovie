import React from "react";
import UserPageProfile from "./userProfile";
import PageSearchBar from "../components/searchBar";
import GetPageByItsUnique from "./getPageByUnique";

export default function Pages() {
  return (
    <main className=" flex justify-center text-white  ">
      <section className=" w-4hundred h-[100vh] bg-white pt-14 ">
        <GetPageByItsUnique />
      </section>
      <div className=" flex flex-col items-center min-h-[100vh] pt-14 w-full bg-black relative">
        <PageSearchBar />
        <div className=" mt-3 w-full h-full  grid grid-cols-5 max-h-[86vh] overflow-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
            <UserPageProfile number={number} key={number} />
          ))}
        </div>
      </div>
    </main>
  );
}
