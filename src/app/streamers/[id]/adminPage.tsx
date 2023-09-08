"use client";
import {
  faCoins,
  faHeart,
  faStar,
  faStarHalfAlt,
  faTrophy,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "next/image";
// type AdminPageProp = {
//   isHidden: boolean;
// };
export default function AdminPage() {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  return (
    <>
      <article
        className={
          " w-full h-4hundred bg-black flex items-center mt-16 " +
          (isHidden && " hidden")
        }
      >
        {/* user profile section */}
        <section
          className=" rounded-md h-full w-5hundred flex flex-col bg-no-repeat bg-cover justify-center items-center text-xl p-7 bg-slate-600 "
          style={{ backgroundImage: "url(/bb.png)" }}
        >
          <Image
            width={140}
            height={140}
            alt="luffy"
            src="/luffy.jpg"
            className=" w-[130px] h-[130px] rounded-full bg-gray-400 "
          />

          <h1 className=" text-4xl font-bold font-mono text-fuchsia-800 backdrop-blur-sm rounded-md">
            user
          </h1>
        </section>
        {/* user trophy section */}
        <section className=" w-[50%] h-full flex flex-col ">
          {/* user's bounty or followers */}
          <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faCoins}
              className=" w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
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
              className=" w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
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
              className=" w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">No trophy yet</span>
          </div>
          {/* user trophy */}
          <div className=" m-2 text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faHeart}
              className=" w-[34px] h-[34px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">Like : 100k</span>
          </div>
        </section>
        {/* contact and social section  */}
        <section className=" flex flex-col w-[200px] text-xl p-3 bg-white h-full">
          <span className=" text-start p-2 font-mono text-2xl text-black">
            Contact
          </span>
          <div className=" flex flex-wrap ">
            <button className=" p-2 rounded-md bg-blue-600 hover:bg-blue-800 text-white m-1">
              Facebook
            </button>
            <button className=" p-2 rounded-md bg-sky-400 hover:bg-sky-600 text-white m-1">
              Twitter
            </button>
            <button className=" p-2 rounded-md bg-black hover:bg-slate-900 text-white m-1">
              Tiktok
            </button>
            <button className=" p-2 rounded-md bg-blue-700 hover:bg-blue-900 text-white m-1">
              Discord
            </button>
          </div>
        </section>
      </article>
      {/* admin page handler */}
      {isHidden ? (
        <FontAwesomeIcon
          icon={faUser}
          onClick={() => setIsHidden(!isHidden)}
          className=" cursor-pointer items-center p-3 w-[28px] h-[28px] bg-fuchsia-600 text-white fixed rounded-full bottom-3 left-2 z-20"
        />
      ) : (
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setIsHidden(!isHidden)}
          className=" cursor-pointer items-center p-3 w-[28px] h-[28px] bg-fuchsia-600 text-white fixed rounded-full bottom-3 left-2 z-20"
        />
      )}
    </>
  );
}
