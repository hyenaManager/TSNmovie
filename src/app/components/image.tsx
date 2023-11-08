"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import luffy from "public/luffy.jpg";
import Link from "next/link";

type homeImageProps = {
  imageSource: string;
};

export default function HomeImage({ imageSource }: homeImageProps) {
  return (
    <Image
      src={luffy}
      alt="imageSource"
      width={100}
      height={100}
      placeholder="blur"
      className=" xsm:w-[130px] sm:w-[200px] shadow-[0_0_20px_purple] m-2 rounded-md opacity-100 object-cover"
    />
  );
}
