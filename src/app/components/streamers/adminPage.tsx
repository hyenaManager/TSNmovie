"use client";
import {
  faCoins,
  faEye,
  faHeart,
  faPeopleGroup,
  faStar,
  faThumbsUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";
import { useContext, useEffect } from "react";
import { userProvider } from "@/app/context/userContext";
import RatePage from "./rating";

export default function AdminPage({ pageId }: { pageId: string }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  //fetch page
  const { data, status, error } = useQuery({
    queryKey: ["page", pageId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pages/${pageId}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
  });
  const { user, userPage }: any = useContext(userProvider); //getting current user from contextprovider
  //add view
  const addNewViewList = async () => {
    const response = await axios.put(`http://localhost:3000/api/pages/viewed`, {
      pageId: data?.id,
      viewCount: [...data?.viewedBy, session?.user.email],
    });
    if (response.status === 200) {
      queryClient.invalidateQueries(["page"]);
    }
  };
  //check whether the user already exist in the followers,
  const checkFollowMode = () => {
    const followerExist =
      data?.followers.find((user: any) => user.id === session?.user.id) !==
      undefined;
    return followerExist; //will return boolean,exist =>true,not exist =>false
  };
  //updating follow or unfollow mode
  const handleFollow = async () => {
    const response = await axios.put(`http://localhost:3000/api/pages`, {
      userId: session?.user.id,
      pageId: pageId,
      unfollow: checkFollowMode(),
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return "there's been some error";
    }
  };
  const mutation = useMutation(handleFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user.email]);
      queryClient.invalidateQueries(["page", pageId]);
    },
  });
  useEffect(() => {
    if (data && !data?.viewedBy?.includes(session?.user.email)) {
      addNewViewList();
    }
  }, [session?.user.email, data]);
  console.log(data?.contact, "is contact");

  if (status === "loading") return <AdminSkeleton />;

  return (
    <>
      <article
        className={
          "pageWarper w-full xsm:h-full flex xsm:flex-col sm:flex-row sm:h-4hundred bg-black items-center mt-16 "
        }
      >
        {/* user profile section */}
        <section className="pageWarper relative rounded-md xsm:h-3hundred sm:h-full xsm:w-full sm:w-5hundred flex flex-col bg-cover bg-no-repeat bg-center justify-end items-center text-xl p-7 bg-slate-600 ">
          <Image
            width={130}
            height={130}
            alt="luffy"
            style={{
              objectFit: "cover",
            }}
            src={data?.image || "/defaultProfile.jpeg"}
            className=" w-[130px] h-[130px] rounded-full z-10 bg-gray-400 border-4 border-white"
          />
          <Image
            fill
            alt={"bg image"}
            style={{
              objectFit: "cover",
            }}
            quality={100}
            src={data?.coverImage || "/defaultProfile.jpeg"}
          />

          <h1
            className=" text-4xl font-bold font-mono text-white z-10 rounded-md"
            style={{ textShadow: "2px 2px 8px black" }}
          >
            {data?.name}
          </h1>
          {/* coverImage */}
        </section>
        {/* user trophy section */}
        <section className="pageWarper xsm:w-full xsm:h-full p-2 xsm:overflow-auto sm:overflow-hidden sm:w-[50%] sm:h-full flex xsm:flex-row xsm:flex-wrap sm:flex-col ">
          {/* user's bounty or followers */}
          <div className=" xsm:m-1 sm:m-2 xsm:text-lg sm:text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faPeopleGroup}
              className="shadow-[0_0_20px_green] xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-green-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">
              Followers : {data?.followers?.length}
            </span>

            <button
              onClick={() => mutation.mutate()}
              className=" bg-fuchsia-500 hover:bg-fuchsia-600 p-1 rounded-md text-lg text-white"
            >
              {checkFollowMode() ? "unfollow" : "follow"}
            </button>
          </div>
          {/* user's rating */}
          <RatePage
            raterList={data?.ratedBy}
            pageId={data?.id}
            rating={data?.rating}
          />
          {/* user trophy */}
          {/* <div className=" xsm:m-1 sm:m-2 xsm:text-lg sm:text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faHeart}
              className=" shadow-[0_0_20px_red] xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-red-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">Seek : un</span>
          </div> */}
          {/* user trophy */}
          <div className=" xsm:m-1 sm:m-2 xsm:text-lg sm:text-2xl flex items-center p-2 bg-black w-full justify-start ">
            <FontAwesomeIcon
              icon={faEye}
              className="shadow-[0_0_20px_blue] xsm:w-[14px] xsm:h-[14px] sm:w-[20px] sm:h-[20px] mr-3 text-blue-600 p-4 border-2 border-white rounded-full"
            />
            <span className=" mr-2 font-mono text-white">
              view : {data?.viewedBy.length}
            </span>
          </div>
        </section>
        {/* contact and social section  */}
        <section className="pageWarper flex flex-col xsm:w-full sm:w-[200px] text-xl p-3 bg-slate-900 xsm:h-2hundred sm:h-full rounded-lg">
          <span className=" text-start p-2 font-mono text-2xl text-white">
            Contact
          </span>
          <div className=" flex flex-wrap ">
            {data?.contact.facebook && (
              <a
                target="blank"
                href={`https://${data?.contact.facebook}`}
                className=" p-2 rounded-md bg-blue-600 hover:bg-blue-400 text-white m-1"
              >
                Facebook
              </a>
            )}
            {data?.contact.twitter && (
              <a
                target="blank"
                href={`https://${data?.contact.twitter}`}
                className=" p-2 rounded-md bg-sky-400 hover:bg-sky-500 text-white m-1"
              >
                Twitter
              </a>
            )}
            {data?.contact.telegram && (
              <a
                target="blank"
                href={`https://${data?.contact.telegram}`}
                className=" p-2 rounded-md bg-black hover:bg-slate-500 text-white m-1"
              >
                telegram
              </a>
            )}
            {data?.contact.whatsapp && (
              <a
                target="blank"
                href={`https://${data?.contact.whatsapp}`}
                className=" p-2 rounded-md bg-blue-700 hover:bg-blue-900 text-white m-1"
              >
                whatsapp
              </a>
            )}
          </div>
        </section>
      </article>
    </>
  );
}
