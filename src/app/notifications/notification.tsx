"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useContext, useState, useTransition } from "react";
import { userProvider } from "../context/userContext";
import Link from "next/link";
import NotiSkeletonLi from "../skeletons/notiSkeletons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NotiFications() {
  const { user }: any = useContext(userProvider);
  const [selectedNotiId, setSelectedNotiId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const { data, status } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://yokeplay.vercel.app/api/notifications/${user?.id}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
  const handleDeleteNoti = (notiId: string) => {
    setSelectedNotiId(notiId);
    startTransition(() => mutation.mutate());
  };
  const mutation = useMutation(async () => {
    const response = await axios.delete(
      `https://yokeplay.vercel.app/api/notifications/${selectedNotiId}`
    );
  });
  return (
    <section className=" w-[98%] h-full bg-white p-3 mt-4 rounded-md ">
      {/* <SpinLoading /> */}
      <h3 className=" text-xl font-bold text-fuchsia-800">Notifications</h3>
      <hr className=" border-b-2 border-b-fuchsia-500" />
      <ul className=" w-full p-2 flex justify-center flex-col">
        {!data &&
          [1, 2, 3, 4, 5].map((number) => <NotiSkeletonLi key={number} />)}
        {data?.map((noti: any, index: number) => (
          <li
            key={index}
            className=" w-[98%] text-sm hover:text-white hover:bg-fuchsia-700 text-fuchsia-700 p-1 m-1 flex justify-between relative cursor-pointer"
          >
            <p className=" p-1">{noti?.message}</p>
            <div className=" flex justify-end items-center">
              <Link
                href={{
                  pathname: `/notifications/${noti?.holder}`,
                  query: {
                    notificationId: noti?.id,
                    holderId: noti?.holderId,
                    notiWatched: noti?.watched, //if the noti is already watched or not
                  },
                }}
                className=" p-1 text-end"
              >
                check
              </Link>
              <FontAwesomeIcon
                onClick={() => handleDeleteNoti(noti.id)}
                icon={faTrash}
                className=" w-[30px] h-[30px] text-red-500 p-2 rounded-md"
              />
            </div>
            {/* show red dot if the notification is not watched */}
            {!noti.watched && (
              <span className=" w-[10px] h-[10px] rounded-full bg-red-600 absolute left-1"></span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
