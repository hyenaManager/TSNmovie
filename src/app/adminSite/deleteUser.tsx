"use client";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteUser({
  userEmail,
  name,
}: {
  userEmail: string;
  name: string;
}) {
  const queryClient = useQueryClient();
  const deleteUser = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `https://yokeplay.vercel.app/api/users/${userEmail}`
      );
      if (response.status === 200) {
        return toast.success(response.data);
      } else {
        return toast.error(" error in deleting user");
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
  return (
    <button
      onClick={() => deleteUser.mutate()}
      className="actions flex justify-center w-full items-center "
    >
      <FontAwesomeIcon
        icon={faTrash}
        className=" text-red-600 w-[18px] h-[18px]"
      />
    </button>
  );
}
