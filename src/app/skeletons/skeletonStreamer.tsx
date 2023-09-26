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

export function ProfileNavSkeleton() {
  return (
    <nav className=" flex p-2 justify-between items-center border-b-2 border-fuchsia-500">
      <div className=" flex justify-center items-center animate-pulse">
        <div className=" w-[40px] h-[40px] bg-fuchsia-500 rounded-full"></div>
        <h3 className=" text-center w-[110px] rounded-lg m-1 h-[27px] bg-fuchsia-500 text-white text-lg p-2 uppercase"></h3>
      </div>
    </nav>
  );
}

// export default function SkeletonStreamer
