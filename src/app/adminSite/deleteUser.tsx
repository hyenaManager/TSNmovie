"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteUser({
  userEmail,
  name,
}: {
  userEmail: string;
  name: string;
}) {
  const deleteUser = useMutation(async () => {
    const response = await axios.delete(
      `http://localhost:3000/api/users/${userEmail}`
    );
    if (response.status === 200) {
      return toast.success(response.data);
    } else {
      return toast.error(" error in deleting user");
    }
  });
  return (
    <button
      onClick={() => deleteUser.mutate()}
      className="actions flex justify-end w-full items-center"
    >
      <FontAwesomeIcon
        icon={faTrash}
        className=" text-red-600 w-[18px] h-[18px]"
      />
    </button>
  );
}
