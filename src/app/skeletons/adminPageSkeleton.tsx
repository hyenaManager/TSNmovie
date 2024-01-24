export default function AdminSkeleton() {
  return (
    <article
      className={
        "streamer-adminPage w-full xsm:h-full flex xsm:flex-col sm:flex-row sm:h-4hundred bg-black items-center"
      }
    >
      {/* user profile section */}
      <section className=" animate-pulse rounded-md xsm:h-3hundred sm:h-full xsm:w-full sm:w-5hundred flex flex-col bg-no-repeat bg-cover justify-end items-center text-xl p-7 bg-slate-600 ">
        <div className=" w-[130px] h-[130px] rounded-full  bg-gray-400 "></div>

        <h1 className=" text-4xl font-bold font-mono  w-[60px] h-[20px] bg-gray-800 rounded-lg text-white ">
          {/* pagename */}
        </h1>
      </section>
      {/* user trophy section */}
      <section className=" animate-pulse xsm:w-full xsm:h-full p-2 xsm:overflow-auto sm:overflow-hidden sm:w-[50%] sm:h-full flex xsm:flex-row xsm:flex-wrap sm:flex-col ">
        {/* user's bounty or followers */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className=" bg-gray-700  xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full">
            {/* coin icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Bounty : 1k */}
          </span>
        </div>
        {/* user's rating */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className=" bg-gray-700  xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full">
            {/* icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Rating : 4.5 */}
          </span>
        </div>
        {/* user trophy */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className="  bg-gray-700  xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full">
            {/* icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Trophy : No trophy yet */}
          </span>
        </div>
        {/* user trophy */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className="shadow-[0_0_20px_red]  xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-red-600 p-4 border-2 border-white rounded-full">
            {/* icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Like : 100k */}
          </span>
        </div>
      </section>
      {/* contact and social section  */}
      <section
        className=" animate-pulse text-xl p-3 bg-slate-900 h-full rounded-lg flex flex-col xsm:w-full sm:w-[200px]
xsm:h-2hundred sm:h-full"
      >
        <span className=" text-start p-2 w-[60px] h-[20px] bg-gray-800 rounded-lg font-mono text-2xl text-white">
          {/* Contact */}
        </span>
        <div className=" flex flex-wrap ">
          <button className=" p-2 rounded-md w-[60px] h-[20px] bg-blue-600 hover:bg-blue-400 text-white m-1">
            {/* Facebook */}
          </button>
          <button className=" p-2 rounded-md w-[60px] h-[20px] bg-sky-400 hover:bg-sky-500 text-white m-1">
            {/* Twitter */}
          </button>
          <button className=" p-2 rounded-md w-[60px] h-[20px] bg-black hover:bg-slate-500 text-white m-1">
            {/* Tiktok */}
          </button>
          <button className=" p-2 rounded-md w-[60px] h-[20px] bg-blue-700 hover:bg-blue-900 text-white m-1">
            {/* Discord */}
          </button>
        </div>
      </section>
    </article>
  );
}
