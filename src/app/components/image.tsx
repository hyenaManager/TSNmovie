"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import luffy from "public/luffy.jpg";
import Link from "next/link";

type homeImageProps = {
  imageSource: string;
};
type pagesProps = {
  id: string;
  name: string;
  // adminId: string;
  // createAt: Date;
  // updateAt: Date;
  image: string;
};

export default function HomeImage({ imageSource }: homeImageProps) {
  const image = useRef<HTMLImageElement | null>(null);
  // const imgHidden = " w-60 shadow-[0_0_20px_purple] m-2 rounded-md opacity-0 ";
  // const imgVisible = " shadow-[0_0_20px_purple] m-2 rounded-md opacity-100";

  return (
    <Image
      src={luffy}
      ref={image}
      alt="imageSource"
      width={200}
      height={200}
      placeholder="blur"
      sizes="(max-width:480px):10vw,(max-width:1020px):400px"
      className=" shadow-[0_0_20px_purple] m-2 rounded-md opacity-100 bg-cover"
    />
  );
}
export function UserPageProfile({ id, name, image }: pagesProps) {
  return (
    <>
      <article
        className=" flex flex-col items-center text-xl relative xsm:min-h-[200px] sm:max-h-[200px]  lg:max-h-[260px]"
        key={JSON.stringify(id)}
      >
        <Image
          fill
          alt={name}
          src={image}
          sizes="(max-width:480px):50vw,(max-width:1020px):100vw"
          className=" rounded-full bg-gray-400 shadow-[0_0_20px_purple] "
        />
        <Link
          href={`/streamers/${id}`}
          className="absolute bottom-0 w-full flex justify-center items-end  bg-fuchsia-700 rounded-md"
        >
          <h2
            className="  xsm:text-sm sm:text-lg rounded-md align-bottom  text-white"
            style={{ textShadow: "2px 2px 8px black" }}
          >
            {name}
          </h2>
        </Link>
      </article>
    </>
  );
}
