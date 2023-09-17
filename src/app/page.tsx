import Link from "next/link";
import HomeArticles from "./components/movieShow";

export default function Home() {
  return (
    <div className=" pageWarper flex justify-center bg-black flex-col">
      <h1 className=" text-4xl text-center font-mono mt-14 text-fuchsia-600 p-3 divide-fuchsia-700 divide-x-2 capitalize">
        YokePlay Display
      </h1>
      <hr className="border-t-2 border-fuchsia-500" />
      <HomeArticles />
      <button className=" hover:text-white ease-in-out transition text-xl max-w-fit rounded-md text-fuchsia-600 p-3 flex justify-end  m-3">
        <Link href={"/api/auth/register"}>Getting Start </Link>
      </button>
    </div>
  );
}
