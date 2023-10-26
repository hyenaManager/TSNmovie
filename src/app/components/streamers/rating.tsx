"use client";

import { userProvider } from "@/app/context/userContext";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function RatePage({
  raterList,
  pageId,
  rating,
}: {
  raterList: string[];
  pageId: string;
  rating: number;
}) {
  const [isRating, setIsRating] = useState(false); //show rating component or not
  const { user, userPage }: any = useContext(userProvider);
  const userAlreadyRated = raterList?.includes(user?.email);
  const ratingContent = `Rating : ${
    rating === 0 ? rating : (rating / raterList?.length).toFixed(1)
  }/5 (${raterList?.length} ${raterList?.length > 1 ? "users" : "user"})`;

  return (
    <div className=" xsm:m-1 sm:m-2 xsm:text-sm  sm:text-lg md:text-xl lg:text-3xl flex items-center p-2 bg-black w-full justify-start ">
      <FontAwesomeIcon
        icon={faStar}
        className="shadow-[0_0_20px_yellow] xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-yellow-600 p-4 border-2 border-white rounded-full"
      />
      <span className=" mr-2 font-mono text-white">{ratingContent}</span>

      {!userAlreadyRated && (
        <button
          onClick={() => setIsRating(true)}
          className=" bg-fuchsia-500 hover:bg-fuchsia-600 p-1 rounded-md text-lg text-white"
        >
          Rate
        </button>
      )}
      {isRating && (
        <Rating
          handleVisibility={() => setIsRating(false)}
          raterList={raterList}
          pageId={pageId}
        />
      )}
    </div>
  );
}

function Rating({
  handleVisibility,
  raterList,
  pageId,
}: {
  handleVisibility: () => void;
  raterList: string[];
  pageId: string;
}) {
  const { user, userPage }: any = useContext(userProvider);
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const mutation = useMutation(
    async () => {
      const response = await axios.put(
        `http://localhost:3000/api/pages/rating`,
        {
          newRaterList: [...raterList, user?.email],
          newRating: rating,
          pageId: pageId,
        }
      );
      if (response.status === 200) {
        toast.success("rated successfully");
        handleVisibility();
      } else {
        toast.error(response.statusText);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["page"]);
      },
    }
  );

  return (
    <div className="pageWarper fixed top-0 left-0 backdrop-brightness-50 z-50 w-full h-full flex justify-center items-center">
      <div className=" relative xsm:w-[80vw] sm:w-[50vw] xsm:-[40vh] bg-slate-950 sm:h-[50vh] flex justify-center items-center flex-col border-2 rounded-xl ">
        <ul className="mb-2 flex w-[60%] justify-center items-center">
          {[1, 2, 3, 4, 5].map((number) => (
            <li
              className=" w-full flex justify-center items-center "
              key={number}
            >
              <FontAwesomeIcon
                onClick={() => setRating(number)}
                icon={faStar}
                className={
                  "p-1 w-[40px] h-[40px] " +
                  (rating >= number ? "text-yellow-500" : "text-white")
                }
              />
            </li>
          ))}
        </ul>
        <button
          onClick={() => mutation.mutate()}
          className="mt-5 p-3 max-w-fit rounded-md text-lg text-white bg-yellow-400"
        >
          Rate
        </button>
        <button
          onClick={() => handleVisibility()}
          className=" absolute top-1 right-1"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-white w-[30px] h-[30px] p-1"
          />
        </button>
      </div>
    </div>
  );
}
