"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import MovieList from "./movieList";
import ClipList from "./clipList";
import { useSearchParams } from "next/navigation";

type videoProp = { name: string; image: string; id: string; author: string };

export default function MainList() {
  const searchParams = useSearchParams();
  const pageName = searchParams.get("pageName");
  //   const { data: session } = useSession();
  let series = true;
  let movies = true;
  let clips = true;
  const { data, status, error } = useQuery({
    queryKey: ["page", pageName],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pages/page?pageName=${pageName}`
        );

        return response.data;
      } catch (error) {
        alert(error);
        return error;
      }
    },
  });
  console.log("this is Main page... and name is: ", pageName);
  console.log("this is clip.....", data?.[0].clips);
  console.log("this is data....", data);

  //   console.log("this is data...", data);
  if (data?.length === 0) return <h2>No data right now :0</h2>;
  if (!data) return <h2>Oh no there is a problem in fetching {data}</h2>;
  return (
    <div className=" pageWarper ">
      <ClipList clips={data?.[0].clips} pageData={data?.[0]} />
    </div>
  );
}
