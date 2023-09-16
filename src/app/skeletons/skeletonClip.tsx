export default function SkeletonClip() {
  return (
    <article className=" video-player flex flex-col justify-center items-center border-2 border-fuchsia-500 xsm:w-[99%] sm:w-[600px] p-2 relative rounded-xl mt-5 ">
      <div className=" h-5hundred w-full video"></div>
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
