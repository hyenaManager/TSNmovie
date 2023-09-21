"use client";
import Image from "next/image";
import { Eye, Like, Star } from "@/app/components/reactions";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

type videoProp = { name: string; image: string; id: string; author: string };

export default function MovieList({ pageName }: { pageName: string }) {
  return <section>bruh</section>;
}

function Movies({ name, image, id, author }: videoProp) {
  // const [isHover, setIsHover] = useState<boolean>(false);
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
          className=" rounded-t-xl rounded-r-xl  bg-gray-400 bg-cover h-[80%] w-[90%] "
        />
      )}

      <div className=" flex absolute top-0 right-0 items-center flex-col justify-center backdrop-brightness-75 rounded-sm ">
        <Like colorClass={"text-red-400"} />
        <Eye colorClass="text-blue-400" />
        <Star colorClass="text-yellow-500" />
      </div>

      <Link
        href={`/streamers/${author}/${id}`}
        className=" flex justify-center items-center"
      >
        <h3 className=" text-center">{name} </h3>
      </Link>
    </article>
  );
}
