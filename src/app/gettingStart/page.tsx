"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function GettingStart() {
  const router = useRouter();

  useEffect(() => {
    // Add any necessary side-effects or initializations here
  }, []);

  return (
    <>
      <div className="pageWrapper z-50 fixed top-0 left-0 w-full h-full bg-gradient-to-r from-fuchsia-500 to-red-600 flex flex-col justify-center items-center p-4">
        <div className="flex flex-col border bg-white shadow-2xl rounded-xl justify-center h-auto w-full max-w-lg items-center p-8 relative animate-fadeIn">
          <h2
            className="text-center text-[20px] sm:text-[30px] md:text-[40px] lg:text-[45px] text-black font-mono"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)" }}
          >
            Hey buddy, you're starting in our app! Feel free to contact us.
          </h2>
          <Link
            href={`/gettingStart/coverPicture`}
            className="mt-6 bg-green-400 hover:bg-green-600 p-3 rounded-md text-white transition duration-300 transform hover:scale-105"
          >
            Create your own page
          </Link>
        </div>
        <button
          className=" rounded-md p-2 text-white bg-black absolute top-4 left-4 hover:bg-gray-800 transition duration-300"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </>
  );
}
