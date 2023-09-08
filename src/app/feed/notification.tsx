"use client";
import { useQuery } from "@tanstack/react-query";
import { getNotification } from "./feedApi";
import { useSession } from "next-auth/react";
import { time } from "console";

export default function FeedNotiSideBar() {
  const { data: session } = useSession();
  const { data, status } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotification,
  });
  //filt notifications for current user
  const filteredNotis = data?.filter(
    (noti: { user: number }) => session?.user.id === noti.user
  );
  return (
    <aside className=" w-4hundred max-h-[80vh] bg-white p-3 rounded-md fixed top-[67px] right-3">
      <h3 className=" text-xl font-bold text-fuchsia-800">Notifications</h3>
      <hr className=" border-b-2 border-b-fuchsia-500" />
      <ul className=" w-full p-2 flex justify-center flex-col">
        {filteredNotis?.map(
          (
            data: { status: string; time: string; watched: boolean },
            index: number
          ) => (
            <li
              key={index}
              className=" w-[98%] text-sm hover:text-white hover:bg-fuchsia-700 text-fuchsia-700 p-1 m-1 flex justify-between relative cursor-pointer"
            >
              <p className=" p-1">{data.status}</p>
              <small className=" p-1 text-end">{data.time}</small>
              {/* show red dot if the notification is not watched */}
              {!data.watched && (
                <span className=" w-[10px] h-[10px] rounded-full bg-red-600 absolute left-1"></span>
              )}
            </li>
          )
        )}
      </ul>
    </aside>
  );
}
