import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SkeletonClip() {
  return (
    <article className=" video-player flex flex-col justify-center items-center border-2 border-fuchsia-500 xsm:w-[99vw] sm:w-[600px] p-2 relative rounded-xl mt-5 ">
      <div className=" h-5hundred xsm:w-[98vw] sm:w-[310px] video"></div>
      <section className=" absolute animate-pulse top-0 border-b-2 border-fuchsia-400 w-full rounded-t-xl flex flex-col bg-black">
        {/* header */}
        <div className=" flex justify-start items-center p-2">
          <div className=" w-[50px] h-[50px] rounded-full bg-fuchsia-500 mr-2 cursor-pointer"></div>
          <h4 className=" rounded-md cursor-pointer bg-fuchsia-500 w-[80px] h-[30px]"></h4>
        </div>
        <span className=" text-sm bg-fuchsia-400 rounded-lg text-start items-center p-2 w-[150px] h-[20px] m-1 "></span>
      </section>
    </article>
  );
}

export function SkeletonSmClip() {
  return (
    <article className=" animate-pulse video-player flex flex-col justify-center items-center border-2 border-fuchsia-500 w-full p-2 relative rounded-xl mt-5 ">
      <div className=" xsm:h-2hundred sm:h-3hundred  w-[250px]  video"></div>
      <div className=" absolute top-2 left-2 w-[50px] h-[50px] rounded-full bg-fuchsia-500 mr-2 "></div>
      <FontAwesomeIcon
        icon={faPlay}
        className=" w-[50px] h-[50px] text-fuchsia-500 absolute top-50 left-50"
      />
    </article>
  );
}
