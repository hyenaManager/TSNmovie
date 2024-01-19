"use client";

import "nprogress/nprogress.css";
import nProgress from "nprogress";
import Link from "next/link";
import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
export function CustomLink({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        onClick={() => {
          nProgress.settings.showSpinner = false;
          nProgress.start();
          console.log("load start");
        }}
        className=" min-w-fit min-h-fit"
      >
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
