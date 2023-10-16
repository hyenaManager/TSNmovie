"use client";
import React, { useState } from "react";
import { useCurrentUploadings } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function CurrentUploading() {
  const [showLoadingText, setShowLoadingText] = useState(false);
  const currentUploading = useCurrentUploadings(
    (state) => state.currentUploading
  );
  console.log("this is currentLoading :", currentUploading);
  return (
    <div className=" xsm:w-[98vw] sm:max-w-[400px] fixed top-11 left-0  flex z-50 ">
      {currentUploading.length !== 0 && (
        <FontAwesomeIcon
          icon={faUpload}
          fade
          onClick={() => setShowLoadingText(!showLoadingText)}
          className="w-[30px] h-[30px] text-white bg-fuchsia-600 rounded-full p-2"
        />
      )}
      {currentUploading.length !== 0 && showLoadingText && (
        <>
          <ul className="grid grid-cols-1 divide-y text-white w-full rounded-lg border-2 border-fuchsia-950 bg-fuchsia-600">
            <p className=" text-center text-lg">
              uploading task: {currentUploading?.length}
            </p>
            {currentUploading.map((currentObj) => (
              <li
                key={currentObj?.id}
                className=" text-sm text-white flex justify-between items-center p-1 text-center"
              >
                <div>{currentObj?.title}</div>
                <div>{currentUploading && currentObj?.percent}%</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
