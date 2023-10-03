"use client";
import Image from "next/image";
export default function CatagoryNavbar({
  setCurrentCatagory,
}: {
  setCurrentCatagory: (catagory: string) => void;
}) {
  // const searchParams = useSearchParams();
  // const pageName = searchParams.get("pageName");
  return (
    <>
      <nav className="pageWarper xsm:w-full sm:w-[100vw] mt-2 flex justify-between ">
        <ul className="pageWarper flex w-full items-center">
          <li
            onClick={() => setCurrentCatagory("series")}
            className=" flex justify-center items-center cursor-pointer w-full h-full bg-black p-3 hover:bg-fuchsia-600 "
          >
            <Image src={"/svgs/stack.svg"} width={50} height={50} alt="stack" />
            <h4>series</h4>
          </li>
          <li
            onClick={() => setCurrentCatagory("clips")}
            className=" flex justify-center items-center cursor-pointer w-full h-full bg-black p-3 hover:bg-fuchsia-600 "
          >
            <Image src={"/svgs/clips.svg"} width={50} height={50} alt="stack" />
            <h4>clips</h4>
          </li>
          <li
            onClick={() => setCurrentCatagory("movies")}
            className=" flex justify-center items-center cursor-pointer w-full h-full bg-black p-3 hover:bg-fuchsia-600 "
          >
            <Image src={"/svgs/movie.svg"} width={50} height={50} alt="stack" />
            <h4>movie</h4>
          </li>
        </ul>
      </nav>
    </>
  );
}
