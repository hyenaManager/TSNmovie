"use client";
import { Eye, Like, Star } from "../reactions";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { userProvider } from "@/app/context/userContext";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
type seriesImage = {
  id: string;
  name: string;
  content: string | null;
  video: string | null;
  likes: string[];
  createAt: Date;
  updateAt: Date;
  image: string;
  viewedBy: string[];
  pageOwnerId: string;
  page: { id: string; name: string; adminId: string };
  chosenSeries: (series: any) => void;
  isChecking: () => void;
  episodes: { id: string; video: string };
};
type seriesOverview = {
  id: string;
  name: string;
  content: string;
  image: string;
  pageOwnerId: string;
  handleVisibility: (series: any) => void;
  episodes: any;
  viewedBy: string[];
};

export default function SeriesImage({
  name,
  id,
  image,
  content,
  page,
  chosenSeries,
  isChecking,
  viewedBy,
  episodes,
}: seriesImage) {
  const { user, userPage }: any = useContext(userProvider);

  return (
    <article
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      className=" border rounded-tr-2xl xsm:h-[30vh] sm:h-[46vh] border-fuchsia-500 flex flex-col justify-end items-center text-xl text-fuchsia-600 font-bold relative "
      key={name}
    >
      {image && (
        <Image
          fill
          src={image}
          alt={image}
          className=" rounded-tr-xl  bg-gray-400 bg-cover object-cover "
        />
      )}

      <div className=" flex absolute top-0 right-0 items-center flex-col justify-center backdrop-brightness-75 rounded-sm ">
        <Like colorClass={"text-red-400"} />
        <Eye colorClass="text-blue-400" count={viewedBy.length} />
        <Star colorClass="text-yellow-500" />
      </div>

      <button
        onClick={() => {
          chosenSeries({ name, image, content, page, id, viewedBy });
          isChecking();
        }}
        className=" flex z-10 flex-col justify-center items-center w-full bg-black border-br-2xl "
      >
        <h3 className=" text-center xsm:text-sm sm:text-lg w-full border-br-2xl">
          {name}{" "}
        </h3>
      </button>
    </article>
  );
}
export function SeriesOverview({
  name,
  id,
  image,
  content,
  handleVisibility,
  pageOwnerId,
  viewedBy,
}: seriesOverview) {
  const { user, userPage }: any = useContext(userProvider);
  const queryClient = useQueryClient();
  //add view
  const addViewSeries = async () => {
    const response = await axios.put(
      `https://yokeplay.vercel.app/api/series/viewed`,
      {
        seriesId: id,
        viewList: [...viewedBy, user.email],
      }
    );
    if (response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["page", pageOwnerId] });
    }
  };
  useEffect(() => {
    if (viewedBy && user && !viewedBy.includes(user?.email)) {
      addViewSeries();
    }
  }, [user, viewedBy]);
  console.log(viewedBy, "is viewed list");

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className=" pageWarper z-50 mt-1 backdrop-blur-sm fixed flex justify-center items-start top-0 left-0 w-full h-full backdrop-brightness-50"
    >
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="xsm:flex-col sm:flex-row flex max-w-fit max-h-[100vh] overflow-auto bg-black shadow-[0px_0px_20px_purple] "
      >
        <div className="relative xsm:h-4hundred xsm:w-full sm:w-4hundred">
          <Image fill src={image} alt="luffy" className=" object-cover " />
        </div>
        <section className=" flex flex-col bg-black justify-start">
          <h2 className=" text-2xl text-fuchsia-500 p-2 text-start">{name}</h2>
          <p className=" xsm:w-[87vw] overflow-auto sm:w-5hundred h-[200px] m-2 ">
            {content}
          </p>
          <h3 className=" p-2 text-fuchsia-600"> Total episodes : unknown</h3>
          <div className=" flex justify-between items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={handleVisibility}
              className=" p-2 m-1 text-red-400 w-[30px] border-2 rounded-full h-[30px] border-white cursor-pointer"
            />
            <Link
              href={{
                pathname:
                  userPage.id === pageOwnerId
                    ? `/profile/page/room`
                    : `/streamers/${pageOwnerId}/room`,
                query: {
                  pageOwnerId: pageOwnerId,
                  seriesId: id,
                },
              }}
              className=" outline-fuchsia-500 text-fuchsia-600 max-w-fit p-3 m-1"
            >
              Watch now
            </Link>
          </div>
        </section>
      </motion.article>
    </motion.div>
  );
}
