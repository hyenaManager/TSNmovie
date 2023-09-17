export default function AdminSkeleton() {
  return (
    <article
      className={
        "streamer-adminPage w-full h-4hundred bg-black flex items-center mt-16 "
      }
    >
      {/* user profile section */}
      <section className=" animate-pulse rounded-md h-full w-5hundred flex flex-col bg-no-repeat bg-cover justify-end items-center text-xl p-7 bg-slate-600 ">
        <div className=" w-[130px] h-[130px] rounded-full  bg-gray-400 "></div>

        <h1 className=" text-4xl font-bold font-mono  w-[60px] h-[20px] bg-gray-800 rounded-lg text-white ">
          {/* pagename */}
        </h1>
      </section>
      {/* user trophy section */}
      <section className=" animate-pulse w-[50%] h-full flex flex-col ">
        {/* user's bounty or followers */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className=" bg-gray-700  w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full">
            {/* coin icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Bounty : 1k */}
          </span>
        </div>
        {/* user's rating */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className=" bg-gray-700  w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full">
            {/* icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Rating : 4.5 */}
          </span>
        </div>
        {/* user trophy */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className="  bg-gray-700  w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full">
            {/* icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Trophy : No trophy yet */}
          </span>
        </div>
        {/* user trophy */}
        <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
          <span className="shadow-[0_0_20px_red]  w-[34px] h-[34px] mr-3 text-red-600 p-4 border-2 border-white rounded-full">
            {/* icon */}
          </span>
          <span className=" mr-2 font-mono w-[60px] h-[20px] bg-gray-800 rounded-lg text-white">
            {/* Like : 100k */}
          </span>
        </div>
      </section>
      {/* contact and social section  */}
      <section className=" animate-pulse flex flex-col w-[200px] text-xl p-3 bg-slate-900 h-full rounded-lg">
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
