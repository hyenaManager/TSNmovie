"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { userProvider } from "../context/userContext";

export default function SuspendUser({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) {
  const { user }: any = useContext(userProvider);
  const notifyUser = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://yokeplay.vercel.app/api/notifications`,
        {
          message: "you are suspended by code number 1",
          type: "suspend",
          holder: "clip",
          userEmail: user.email,
          userId: userId,
          holderId: 1001,
        }
      );
      if (response.status === 200) {
        return toast.success(response.data);
      }
      if (response.status === 500) {
        return toast.error(response.statusText);
      }
    },
  });
  const suspendUser = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://yokeplay.vercel.app/api/users/suspendUser`,
        {
          userEmail: userEmail,
        }
      );
      if (response.status === 200) {
        return toast.success(response.data as string);
      }
    },
  });
  return (
    <button
      onClick={() => {
        suspendUser.mutate();
        notifyUser.mutate();
      }}
      className=" text-lg text-center text-fuchsia-600 p-2 outline-red-400 rounded-md hover:bg-fuchsia-600 hover:text-white "
    >
      suspend
    </button>
  );
}
