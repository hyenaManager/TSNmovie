"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function GettingStart() {
  const router = useRouter();

  return (
    <>
      <div className="pageWarper z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center">
        <div className=" flex flex-col border bg-center shadow-2xl rounded-t-xl justify-center h-[50vh] xsm:w-[95vw] sm:w-[54vw] items-center relative">
          <h2
            className=" text-center text-[50px] text-white font-mono"
            style={{ textShadow: "2px 2px 8px gray" }}
          >
            Hey buddy you starting in our app feel free to contact us
          </h2>
          <Link
            href={`/gettingStart/coverPicture`}
            className="bg-green-400 hover:bg-green-600 p-2 rounded-md"
          >
            Create your own page
          </Link>
        </div>
        <button
          className=" border rounded-md p-2 text-white bg-black fixed top-4 left-4"
          onClick={() => router.back()}
        >
          go back
        </button>
      </div>
    </>
  );
}
