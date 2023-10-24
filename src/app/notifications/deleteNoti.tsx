"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { userProvider } from "../context/userContext";

export const DeleteAllUserNoti = () => {
  const queryClient = useQueryClient();
  const { user }: any = useContext(userProvider);
  const deleteAllNoti = useMutation(async () => {
    const response = await axios.delete(
      `http://localhost:3000/api/notifications?userId=${user.id}`
    );
    if (response.status === 200) {
      queryClient.invalidateQueries(["notifications"]);
    } else {
      toast.error(response.statusText);
    }
  });
  return (
    <button onClick={() => deleteAllNoti.mutate()}>
      Clear all notifications
    </button>
  );
};

export const DeleteOneNotiById = ({ notiId }: { notiId: string }) => {
  const queryClient = useQueryClient();
  const deleteANoti = useMutation(async () => {
    const response = await axios.delete(
      `https://yokeplay.vercel.app/api/notifications/${notiId}`
    );
    if (response.status === 200) {
      queryClient.invalidateQueries(["notifications"]);
    } else {
      toast.error(response.statusText);
    }
  });
  return (
    <button>
      <FontAwesomeIcon
        onClick={() => deleteANoti.mutate()}
        icon={faTrash}
        className=" w-[14px] h-[14px] text-red-500 p-2 rounded-md"
      />
    </button>
  );
};
