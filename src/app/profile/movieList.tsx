"use client";
import Image from "next/image";
import { Eye, Like, Star } from "@/app/components/reactions";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

type videoProp = { name: string; image: string; id: string; author: string };

export default function MovieList() {
  const { data: session } = useSession();
  const { data, status, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/movies/5f78ed6f-1a8a-4c17-a9ae-8d105bfa3bb5"
        );
        return response.data;
      } catch (error) {
        alert(error);
        return error;
      }
    },
  });
  // console.log("this is data...", data);
  if (data?.length === 0) return <h2>No data right now :0</h2>;
  if (!data) return <h2>Oh no there is a problem in fetching {data}</h2>;
  return (
    <div className=" w-full grid grid-cols-5 gap-5 overflow-auto p-3 bg-black min-h-[50vh]">
      {data.length !== 0 &&
        data?.map((data: videoProp) => (
          <Movie
            {...data}
            author={session?.user.name as string}
            key={data?.id}
          />
        ))}
    </div>
  );
}

function Movie({ name, image, id, author }: videoProp) {
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
