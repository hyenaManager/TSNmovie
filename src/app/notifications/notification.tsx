"use client";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useContext } from "react";
import { userProvider } from "../context/userContext";
import SpinLoading from "../components/spinLoading";

export default function NotiFications() {
  const { user }: any = useContext(userProvider);
  const { data, status } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notifications/${user?.id}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
  //filt notifications for current user
  // const filteredNotis = data?.filter(
  //   (noti: { user: string }) => session?.user.name === noti.user
  // );

  return (
    <section className=" w-[98%] h-full max-h-[95vh] bg-white p-3 mt-8 rounded-md ">
      {/* <SpinLoading /> */}
      <h3 className=" text-xl font-bold text-fuchsia-800">Notifications</h3>
      <hr className=" border-b-2 border-b-fuchsia-500" />
      <ul className=" w-full p-2 flex justify-center flex-col">
        {data?.map((data: any, index: number) => (
          <li
            key={index}
            className=" w-[98%] text-sm hover:text-white hover:bg-fuchsia-700 text-fuchsia-700 p-1 m-1 flex justify-between relative cursor-pointer"
          >
            <p className=" p-1">{data?.message}</p>
            <small className=" p-1 text-end">{" boo "}</small>
            {/* show red dot if the notification is not watched */}
            {!data.watched && (
              <span className=" w-[10px] h-[10px] rounded-full bg-red-600 absolute left-1"></span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
