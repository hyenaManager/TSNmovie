"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import luffy from "public/luffy.jpg";

type homeImageProps = {
  imageSource: string;
};

export default function HomeImage({ imageSource }: homeImageProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const image = useRef<HTMLImageElement | null>(null);
  const imgHidden = " w-60 shadow-[0_0_20px_purple] m-2 rounded-md opacity-0 ";
  const imgVisible = " shadow-[0_0_20px_purple] m-2 rounded-md opacity-100";
  useEffect(() => {
    if (image?.current?.complete) setImageIsLoaded(true);
  }, []);

  return (
    <Image
      src={luffy}
      ref={image}
      alt="imageSource"
      width={200}
      height={400}
      placeholder="blur"
      className=" shadow-[0_0_20px_purple] m-2 rounded-md opacity-100"
    />
  );
}
