import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type homeImageProps = {
  imageSource: StaticImport;
};

export default function HomeImage({ imageSource }: homeImageProps) {
  return (
    <Image
      src={imageSource}
      alt="imageSource"
      width={200}
      height={200}
      priority
      placeholder="blur"
      className=" xsm:w-[130px] sm:w-[200px] m-2 rounded-md opacity-100 object-cover"
    />
  );
}
