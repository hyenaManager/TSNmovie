export default function RoomVideoSkeleton() {
  return (
    <div className="w-[70vw] mt-4 h-5hundred flex justify-center shadow-[0_0_30px_purple] rounded-lg border-2 border-fuchsia-600 animate-pulse relative">
      <div className=" rounded-full w-[50px] h-[50px] absolute top-3 left-3 bg-fuchsia-400"></div>
    </div>
  );
}

export function RoomEpisodeSkeleton() {
  return (
    <aside
      className={
        " xsm:w-[95vw] sm:w-[25vw] relative xsm:max-h-fit sm:max-h-[100vh] bg-black  text-black pt-16 rounded-md flex-col "
      }
    >
      <div className="border-2 border-fuchsia-500 rounded-t-md absolute top-14 right-0 w-full p-2 flex justify-end items-center ">
        <div className=" m-1 p-1 outline-none bg-fuchsia-400 h-[30px] w-[190px]">
          {/* search input */}
        </div>
        <div className=" w-[40px] h-[40px] bg-fuchsia-400 p-2 rounded-full">
          {/* search button */}
        </div>
      </div>
      <ul className="border-2 border-fuchsia-500 rounded-b-md flex flex-col w-full items-center overflow-auto mt-12 h-[80vh] ">
        {[1, 2, 3, 4, 5].map((number) => (
          <li
            key={number}
            className=" w-full p-2 flex justify-between items-center"
          >
            <div className=" w-[100px] h-[30px] rounded-md bg-fuchsia-400">
              {/* episode num */}
            </div>
            <span className=" w-[160px] h-[20px] rounded-xl bg-fuchsia-500 ">
              {/* title */}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
