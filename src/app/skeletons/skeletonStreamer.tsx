import Image from "next/image";
export default function SkeletonStreamer() {
  return (
    <article
      className=" animate-pulse flex flex-col items-center text-xl p-5 ml-7"
      key={"hruh"}
    >
      <Image
        src={"/imgPlaceholder.jng"}
        alt="...."
        width={240}
        height={240}
        className=" w-[240px] h-[240px] rounded-full bg-cover bg-gray-400 shadow-[0_0_20px_purple] "
      />
      <h2 className=" w-[80px] h-[20px] bg-gray-500 mt-2"> </h2>
    </article>
  );
}
