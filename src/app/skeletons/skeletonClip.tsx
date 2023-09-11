export default function SkeletonClip() {
  return (
    <article className=" video-player flex flex-col justify-center items-center xsm:w-[99%] sm:w-[600px] p-2 relative rounded-xl mt-5 bg-slate-300">
      <div className=" h-5hundred w-full video"></div>
      <section className=" absolute animate-pulse top-0 w-full rounded-t-xl flex flex-col bg-slate-400">
        <div className=" flex justify-start items-center p-2">
          <div className=" w-[50px] h-[50px] rounded-full bg-gray-500 mr-2 cursor-pointer"></div>
          <h4 className=" text-lg text-slate-400 cursor-pointer bg-gray-500 w-[80px] h-[30px]"></h4>
        </div>
        <span className=" text-sm text-slate-100 text-start items-center p-2 w-[100px] h-[30px] "></span>
      </section>
    </article>
  );
}
