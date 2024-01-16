"use client";
import { useCatagory } from "@/app/store";
import Image from "next/image";
export default function CatagoryNavbar({
  setCurrentCatagory,
}: {
  setCurrentCatagory: (catagory: string) => void;
}) {
  // const searchParams = useSearchParams();
  // const pageName = searchParams.get("pageName");
  const currentCatagory = useCatagory((state) => state.currentCatagory);
  return (
    <>
      <nav className="pageWarper w-full mt-2 flex justify-between ">
        <ul className="pageWarper flex w-full items-center">
          <li
            onClick={() => setCurrentCatagory("series")}
            className={
              " flex justify-center items-center cursor-pointer w-full h-full bg-black  hover:bg-fuchsia-400 " +
              (currentCatagory === "series" ? "bg-fuchsia-600" : "bg-black")
            }
          >
            <Image src={"/svgs/stack.svg"} width={50} height={50} alt="stack" />
            <h4>series</h4>
          </li>
          <li
            onClick={() => setCurrentCatagory("clips")}
            className={
              " flex justify-center items-center cursor-pointer w-full h-full bg-black  hover:bg-fuchsia-400 " +
              (currentCatagory === "clips" ? "bg-fuchsia-600" : "bg-black")
            }
          >
            <Image src={"/svgs/clips.svg"} width={50} height={50} alt="stack" />
            <h4>clips</h4>
          </li>
          <li
            onClick={() => setCurrentCatagory("movies")}
            className={
              " flex justify-center items-center cursor-pointer w-full h-full bg-black  hover:bg-fuchsia-400 " +
              (currentCatagory === "movies" ? "bg-fuchsia-600" : "bg-black")
            }
          >
            <Image src={"/svgs/movie.svg"} width={50} height={50} alt="stack" />
            <h4>movie</h4>
          </li>
        </ul>
      </nav>
    </>
  );
}
