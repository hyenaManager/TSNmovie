// "use client"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
export default function CatagoryNavbar() {
  // const searchParams = useSearchParams();
  // const pageName = searchParams.get("pageName");
  return (
    <>
      <nav className="w-full mt-2 flex justify-between ">
        <ul className="flex w-full items-center">
          <li className=" flex justify-center items-center cursor-pointer w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            <Image src={"/svgs/stack.svg"} width={50} height={50} alt="stack" />
            <h4>series</h4>
          </li>
          <li className=" flex justify-center items-center cursor-pointer w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            <Image src={"/svgs/clips.svg"} width={50} height={50} alt="stack" />
            <h4>clips</h4>
          </li>
          <li className=" flex justify-center items-center cursor-pointer w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            <Image src={"/svgs/movie.svg"} width={50} height={50} alt="stack" />
            <h4>movie</h4>
          </li>
        </ul>
      </nav>
    </>
  );
}
