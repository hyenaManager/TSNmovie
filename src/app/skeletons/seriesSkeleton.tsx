export default function SeriesImgSkeleton() {
  return (
    <>
      <article className=" animate-pulse video-player flex flex-col justify-center items-center border-2 border-fuchsia-500 w-full p-2 relative rounded-xl mt-5 ">
        <div className=" sm:h-3hundred xsm:h-full  w-[250px]  video"></div>
        <div className=" absolute top-2 left-2 w-[50px] h-[50px] rounded-full bg-fuchsia-500 mr-2 "></div>
        <div className=" flex flex-col justify-center items-center absolute top-2 right-1 p-1">
          <span className=" rounded-full w-[30px] h-[30px] m-2 bg-red-500 "></span>
          <span className=" rounded-full w-[30px] h-[30px] m-2 bg-blue-500 "></span>
          <span className=" rounded-full w-[30px] h-[30px] m-2 bg-yellow-500 "></span>
        </div>
      </article>
    </>
  );
}
