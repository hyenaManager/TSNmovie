import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { userProvider } from "../context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteComment({ commentId }: { commentId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `https://yokeplay.vercel.app/api/comments?commentId=${commentId}`
      );
      if (response.status === 200) {
        toast.success("comment deleted");
      } else {
        toast.error(response.statusText);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["childComment"] });
    },
  });
  return (
    <button
      onClick={() => mutation.mutate()}
      className="flex justify-start m-1 "
    >
      <FontAwesomeIcon
        icon={faTrash}
        className=" w-[16px] h-[16px] text-red-500"
      />
    </button>
  );
}
