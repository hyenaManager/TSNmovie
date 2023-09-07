"use client";
import { useEffect, useRef, useState } from "react";

type homeImageProps = {
  imageSource: string;
};

export default function HomeImage({ imageSource }: homeImageProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const image = useRef<HTMLImageElement | null>(null);
  const imgHidden = " w-60 shadow-[0_0_20px_purple] m-2 rounded-md opacity-0 ";
  const imgVisible =
    " w-60 shadow-[0_0_20px_purple] m-2 rounded-md opacity-100";
  useEffect(() => {
    if (image?.current?.complete) setImageIsLoaded(true);
  });

  return (
    <img
      src={imageSource}
      ref={image}
      alt="imageSource"
      className={imageIsLoaded ? imgVisible : imgHidden}
    />
  );
}
