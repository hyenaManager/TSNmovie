import Image from "next/image";
export function NormalSkeleton() {
  return (
    <article
      className="  animate-pulse flex flex-col items-center text-xl relative xsm:min-h-[200px] sm:max-h-[200px]  lg:max-h-[260px]"
      key={"hruh"}
    >
      <div className=" w-full h-full rounded-full bg-cover bg-gradient-to-r from-fuchsia-400 to-black/70  "></div>
      <h2 className=" w-[60%] xsm:h-[10px] sm:h-[30px]  bg-fuchsia-700  rounded-md bottom-0 absolute  ">
        {" "}
      </h2>
    </article>
  );
}
export function HalfSkeleton() {
  return (
    <article
      className=" animate-pulse flex flex-col items-center text-xl relative xsm:min-h-[200px] sm:max-h-[200px]  lg:max-h-[260px]"
      key={"hruh"}
    >
      <div className=" w-full h-full rounded-full bg-cover bg-gradient-to-r from-fuchsia-400 to-black/60  "></div>
      <h2 className=" w-[60%] xsm:h-[10px] sm:h-[30px]  bg-gradient-to-r from-fuchsia-700 to-black rounded-md bottom-0 absolute "></h2>
    </article>
  );
}

// export default function SkeletonStreamer
