import React from "react";
import GetPageByItsUnique from "./getPageByUnique";
import Main from "./main";

export default function Pages() {
  return (
    <div className="pageWarper flex xsm:flex-col sm:flex-row justify-center text-white ">
      <aside className=" sm:w-[27vw] xsm:w-full  sm:h-[100vh] bg-slate-950 pt-14 p-2 ">
        <GetPageByItsUnique />
      </aside>
      <Main />
    </div>
  );
}
