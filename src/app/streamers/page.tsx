import React from "react";
import GetPageByItsUnique from "./getPageByUnique";
import Main from "./main";

export default function Pages() {
  return (
    <div className="pageWarper flex xsm:flex-col sm:flex-row justify-center text-white ">
      <Main />
    </div>
  );
}
