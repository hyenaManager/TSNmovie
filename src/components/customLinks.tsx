"use client";

import "nprogress/nprogress.css";
import nProgress from "nprogress";

export function CustomLink({ children }: { children: React.ReactNode }) {
  return (
    <>
      <button
        onClick={() => {
          nProgress.settings.showSpinner = false;
          nProgress.start();
          console.log("load start");
        }}
      >
        {children}
      </button>
    </>
  );
}
