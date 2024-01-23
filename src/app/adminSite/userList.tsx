"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import DeleteUser from "./deleteUser";
import SuspendUser from "./suspendUser";
import toast from "react-hot-toast";

export default function AllUsers() {
  const {
    data,
    status,
    refetch,
    error,
  }: { error: any; data: any; status: any; refetch: any } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://yokeplay.vercel.app/api/users",
          {
            timeout: 10000,
            timeoutErrorMessage: "fetching timeout check connection",
          }
        );
        if (response.status === 200) {
          return response.data;
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error" || !data) {
    return (
      <div>
        <h4>Error: {error?.message}</h4>
        <button onClick={() => refetch()}>refetch</button>
      </div>
    );
  }

  return (
    <ul className=" w-full p-2 flex justify-start flex-col overflow-auto h-[81vh]">
      {data.map((user: any) => (
        <li
          key={user.id}
          className=" w-[98%] text-sm text-fuchsia-700 p-1 m-1 grid grid-cols-3 items-center justify-between relative "
        >
          <div className="mainNoti w-full flex justify-start items-center ">
            <Image
              src={user?.image}
              alt="noti"
              width={20}
              height={20}
              className="xsm:w-[20px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] rounded-full object-cover mr-1"
            />
            <p className=" p-1">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <DeleteUser
            userEmail={user?.email as string}
            name={user?.firstName + " " + user?.lastName}
          />
          <SuspendUser userEmail={user?.email as string} userId={user?.id} />
        </li>
      ))}
    </ul>
  );
}
