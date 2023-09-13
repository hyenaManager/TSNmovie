import React from "react";
import GetPageByItsUnique from "./getPageByUnique";
import Main from "./main";

export default function Pages() {
  return (
    <div className="pageWarper flex justify-center text-white  ">
      <aside className=" w-4hundred h-[100vh] bg-slate-950 pt-14 p-2 ">
        <GetPageByItsUnique />
      </aside>
      <Main />
    </div>
  );
}
