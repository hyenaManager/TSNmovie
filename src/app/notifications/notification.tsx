"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { userProvider } from "../context/userContext";
import Link from "next/link";
import NotiSkeletonLi from "../skeletons/notiSkeletons";
import Image from "next/image";
import { getTimeAgo } from "../utility/timeAgo";
import { ClipLoading } from "../components/loading";
import { useInView } from "react-hook-inview";
import { DeleteAllUserNoti, DeleteOneNotiById } from "./deleteNoti";

export default function NotiFications() {
  const { user }: any = useContext(userProvider);
  const [ref, inView] = useInView();
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notifications/cursor?cursor=${pageParam}&userId=${user.id}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  //when user scroll to the last notification and if there notification left fetch them
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  return (
    <section className=" w-[98%] min-h-[90vh] bg-white p-3 mt-1 rounded-md ">
      {/* <SpinLoading /> */}
      <div className=" flex justify-between xsm:text-sm sm:text-xl font-bold text-fuchsia-800">
        <h3>Notifications</h3>
        <DeleteAllUserNoti />
      </div>
      <hr className=" border-b-2 border-b-fuchsia-500" />
      <ul className=" w-full p-2 flex justify-start flex-col overflow-auto h-[81vh]">
        {status === "loading" &&
          [1, 2, 3, 4, 5].map((number) => <NotiSkeletonLi key={number} />)}
        {data?.pages?.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page?.notifications?.map((noti: any, index: number) => (
              <li
                key={index}
                className=" w-[98%] text-sm text-fuchsia-700 p-1 m-1 grid grid-cols-3 items-center justify-between relative "
              >
                <div className="mainNoti w-full flex justify-start items-center ">
                  <Image
                    src={noti.notiBy.image}
                    alt="noti"
                    width={20}
                    height={20}
                    className="xsm:w-[20px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] rounded-full object-cover mr-1"
                  />
                  <p className=" p-1">{noti?.message}</p>
                </div>
                <small className="text-slate-500 w-full text-center">
                  {getTimeAgo(new Date(noti.createdAt))}
                </small>
                <div className="actions flex justify-end w-full items-center">
                  <Link
                    href={{
                      pathname: `/notifications/${noti?.holder}`,
                      query: {
                        notificationId: noti?.id,
                        holderId: noti?.holderId,
                        notiWatched: noti?.watched, //if the noti is already watched or not
                      },
                    }}
                    className=" p-1 text-end cursor-pointer"
                  >
                    check
                  </Link>
                  <DeleteOneNotiById notiId={noti?.id as string} />
                </div>
                {/* show red dot if the notification is not watched */}
                {!noti.watched && (
                  <span className=" w-[10px] h-[10px] rounded-full bg-red-600 absolute left-1"></span>
                )}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {hasNextPage && (
        <div ref={ref}>
          <ClipLoading />
        </div>
      )}
    </section>
  );
}
