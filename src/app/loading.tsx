import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed animate-pulse top-0 left-0 w-full h-full flex justify-center items-center">
      <Image
        src={"/mycon.png"}
        width={70}
        height={70}
        alt="myLoading..."
        className=" w-[70px] h-[70px]"
      />
    </div>
  );
}
