"use client";
import {
  faCoins,
  faHeart,
  faStar,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";

export default function AdminPage({ pageId }: { pageId: string }) {
  const { data: session } = useSession();
  const { data, status, error } = useQuery({
    queryKey: ["page", pageId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://yokeplay.vercel.app/api/pages/${pageId}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
  });
  if (status === "loading") return <AdminSkeleton />;
  return (
    <>
      <article
        className={
          "streamer-adminPage w-full xsm:h-full flex xsm:flex-col sm:flex-row sm:h-4hundred bg-black items-center mt-16 "
        }
      >
        {/* user profile section */}
        <section
          className=" rounded-md xsm:h-3hundred sm:h-full xsm:w-full sm:w-5hundred flex flex-col bg-no-repeat bg-cover justify-end items-center text-xl p-7 bg-slate-600 "
          style={{ backgroundImage: "url(/bb.png)" }}
        >
          <Image
            width={130}
            height={130}
            alt="luffy"
            src={data?.image}
            className=" w-[130px] h-[130px] rounded-full bg-gray-400 border-8 border-white"
          />

          <h1
            className=" text-4xl font-bold font-mono text-white rounded-md"
            style={{ textShadow: "2px 2px 8px black" }}
          >
            {data?.name}
          </h1>
        </section>
        {/* user trophy section */}
        <section className=" xsm:w-full xsm:h-2hundred xsm:overflow-auto sm:w-[50%] sm:h-full flex flex-col ">
          {/* user's bounty or followers */}
          <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faCoins}
              className="shadow-[0_0_20px_yellow] w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">Bounty : 1k</span>

            <button className=" bg-fuchsia-500 hover:bg-fuchsia-600 p-1 rounded-md text-lg text-white">
              follow
            </button>
          </div>
          {/* user's rating */}
          <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faStar}
              className="shadow-[0_0_20px_yellow] w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">Rating : 4.5</span>

            <button className=" bg-fuchsia-500 hover:bg-fuchsia-600 p-1 rounded-md text-lg text-white">
              Rate
            </button>
          </div>
          {/* user trophy */}
          <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faTrophy}
              className=" shadow-[0_0_20px_yellow] w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">
              Trophy : No trophy yet
            </span>
          </div>
          {/* user trophy */}
          <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faHeart}
              className="shadow-[0_0_20px_red] w-[34px] h-[34px] mr-3 text-red-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">Like : 100k</span>
          </div>
        </section>
        {/* contact and social section  */}
        <section className=" flex flex-col xsm:w-full sm:w-[200px] text-xl p-3 bg-slate-900 xsm:h-2hundred sm:h-full rounded-lg">
          <span className=" text-start p-2 font-mono text-2xl text-white">
            Contact
          </span>
          <div className=" flex flex-wrap ">
            <button className=" p-2 rounded-md bg-blue-600 hover:bg-blue-400 text-white m-1">
              Facebook
            </button>
            <button className=" p-2 rounded-md bg-sky-400 hover:bg-sky-500 text-white m-1">
              Twitter
            </button>
            <button className=" p-2 rounded-md bg-black hover:bg-slate-500 text-white m-1">
              Tiktok
            </button>
            <button className=" p-2 rounded-md bg-blue-700 hover:bg-blue-900 text-white m-1">
              Discord
            </button>
          </div>
        </section>
      </article>
    </>
  );
}
