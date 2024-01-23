"use client";

import "nprogress/nprogress.css";
import nProgress from "nprogress";
import Link from "next/link";
import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import { useRoutePath } from "@/app/store";
export function CustomLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const setPreviousPath = useRoutePath((state) => state.setPreviousPath);
  const newPath = useRoutePath((state) => state.newPath);
  const setNewPath = useRoutePath((state) => state.setNewPath);
  const handleStartLoading = () => {
    nProgress.start();
    nProgress.settings.showSpinner = false;
    console.log("load start");
  };
  const handleSetPaths = () => {
    if (href != newPath) {
      setPreviousPath(newPath);
      setNewPath(href);
      handleStartLoading();
    }
  };
  return (
    <>
      <div onClick={handleSetPaths} className=" min-w-fit min-h-fit">
        {children}
      </div>
    </>
  );
}

export function NProgressLink({
  href,
  text,
  className = "",
  children,
}: {
  href: Url;
  text?: string;
  className?: string | null;
  children?: React.ReactNode | null;
}) {
  return (
    <>
      <Link
        onClick={() => {
          nProgress.settings.showSpinner = false;
          nProgress.start();
        }}
        href={href}
        className={clsx("text-white", {
          [className as string]: className != "",
        })}
      >
        {text}
        {children}
      </Link>
    </>
  );
}
