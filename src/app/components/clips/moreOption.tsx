import { userProvider } from "@/app/context/userContext";
import { storage } from "@/app/firebase";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function MoreOption({
  setHide,
  clipId,
  pageOwnerId,
  video,
}: {
  setHide: () => void;
  clipId: string;
  pageOwnerId: string;
  video: string;
}) {
  const { userPage }: any = useContext(userProvider);
  const [moreOption, setMoreOption] = useState<boolean>(false); //is user click moreoption or not, for toggling more option
  const queryClient = useQueryClient();
  const handleDeleteClip = async () => {
    try {
      const response = await axios.delete(
        `https://yokeplay.vercel.app/api/clips/${clipId}`
      );
      const data = response.data;
      toast.success(data);
    } catch (error) {
      toast.error("oh there is error check logs");
      console.log(error);
      return error;
    }
  };
  const mutation = useMutation(
    async () => {
      const videoRef = ref(storage, video);
      deleteObject(videoRef)
        .then(() => handleDeleteClip())
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["clips"]),
    }
  );
  return (
    <div className=" moreOption z-30 flex flex-col p-2">
      <FontAwesomeIcon
        onClick={(e) => {
          e.stopPropagation();
          setMoreOption(!moreOption);
        }}
        icon={faEllipsisVertical}
        className=" m-1 text-2xl cursor-pointer"
      />
      {moreOption && (
        <ul className=" absolute origin-top-right right-1 top-[50px] flex flex-col bg-white divide-y divide-fuchsia-600">
          {userPage.id === pageOwnerId && (
            <li
              onClick={(e) => {
                setMoreOption(!moreOption);
                e.stopPropagation;
                mutation.mutate();
              }} //copy link of video
              className="text-black text-sm min-w-[100px] rounded-t-md text-center hover:bg-fuchsia-300 cursor-pointer p-2"
            >
              delete
            </li>
          )}
          <li
            onClick={(e) => {
              e.stopPropagation();
              setMoreOption(!moreOption);
              setHide();
            }}
            className="text-black text-sm min-w-[100px] text-center hover:bg-fuchsia-300 cursor-pointer p-2"
          >
            report
          </li>
        </ul>
      )}
    </div>
  );
}
