import { Eye, Like, Star } from "@/app/components/reactions";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
type seriesImage = {
  id: string;
  name: string;
  content: string | null;
  video: string | null;
  likes: string[];
  createAt: Date;
  updateAt: Date;
  image: string;
  pageOwnerId: string;
  page: { id: string; name: string; adminId: string };
  chosenSeries: (series: any) => void;
  isChecking: () => void;
};
type seriesOverview = {
  id: string;
  name: string;
  content: string;
  image: string;
  pageOwnerId: string;
  handleVisibility: (series: any) => void;
  episodes: any;
};

export default function SeriesImage({
  name,
  id,
  image,
  content,
  page,
  chosenSeries,
  isChecking,
}: seriesImage) {
  return (
    <article
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      className=" border rounded-t-2xl rounded-r-2xl border-fuchsia-500 flex flex-col justify-center items-center text-xl p-1 text-fuchsia-600 font-bold relative "
      key={name}
    >
      {image && (
        <Image
          width={140}
          height={140}
          src={image}
          alt={image}
          className=" rounded-t-xl rounded-r-xl bg-gray-400 bg-cover h-[80%] w-[90%] "
        />
      )}

      <div className=" flex absolute top-0 right-0 items-center flex-col justify-center backdrop-brightness-75 rounded-sm ">
        <Like colorClass={"text-red-400"} />
        <Eye colorClass="text-blue-400" />
        <Star colorClass="text-yellow-500" />
      </div>

      <button
        onClick={() => {
          chosenSeries({ name, image, content, page, id });
          isChecking();
        }}
        className=" flex justify-center items-center"
      >
        <h3 className=" text-center">{name} </h3>
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
}: seriesOverview) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ scale: 0 }}
      className=" pageWarper fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-brightness-50"
    >
      <article className="xsm:flex-col sm:flex-row flex max-w-fit max-h-fit bg-black shadow-[0px_0px_20px_purple] ">
        <Image
          src={image}
          alt="luffy"
          width={200}
          height={200}
          className=" w-3hundred bg-cover"
        />
        <section className=" flex flex-col bg-black justify-start">
          <h2 className=" text-2xl text-fuchsia-500 p-2 text-start">{name}</h2>
          <p className=" xsm:w-[310px] sm:w-5hundred h-[200px] m-2 ">
            {content}......
          </p>
          <h3 className=" p-2 text-fuchsia-600"> Total episodes : unknown</h3>
          <div className=" flex justify-between items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={handleVisibility}
              className=" p-3 m-1 text-red-400 w-[30px] h-[30px] cursor-pointer"
            />
            <Link
              href={{
                pathname: `/streamers/${pageOwnerId}/room`,
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
      </article>
    </motion.div>
  );
}
