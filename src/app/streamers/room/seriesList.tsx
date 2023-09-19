"use client";
import { Suspense } from "react";
import { SkeletonSmClip } from "@/app/skeletons/skeletonClip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, Like, Star } from "@/app/components/reactions";
import Link from "next/link";

type seriesProps = {
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
};
export default function SeriesList() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const { data, status, error } = useQuery({
    queryKey: ["page", pageId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pages/${pageId}/false/false/true`
        );

        return response.data;
      } catch (error) {
        alert(error);
        return error;
      }
    },
  });
  const series = data?.series; //destruturing clips from data
  console.log("this is series :", series);
  console.log("this is series :", data);

  if (error)
    return (
      <div className=" w-full h-3hundred flex justify-center items-center">
        <h3 className=" text-4xl text-red-400 m-2 uppercase">
          Opps something went wrong
        </h3>
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          className=" w-[40px] cursor-pointer h-[40px] text-red-200"
        />
      </div>
    );
  return (
    <>
      <section>
        <div className=" pageWarper grid gap-3 xsm:grid-cols-3 p-2 sm:grid-cols-5 ">
          {status === "loading" &&
            [1, 2, 3, 4].map((number) => <SkeletonSmClip key={number} />)}
          {series?.map((clip: seriesProps) => (
            <Suspense fallback={<SkeletonSmClip />}>
              <SeriesImage {...clip} />
            </Suspense>
          ))}
        </div>
      </section>
    </>
  );
}

function SeriesImage({ name, id, image, content, page }: seriesProps) {
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

      <Link href={`/streamers/`} className=" flex justify-center items-center">
        <h3 className=" text-center">{name} </h3>
      </Link>
    </article>
  );
}
