"use client";
import { faEdit, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { userProvider } from "../context/userContext";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { myUserProfiles } from "../../../public/mySvg";

type myProfiles = {
  name: string;
  source: string;
  id: number;
};

export default function UserProfile() {
  const { user, userPage }: any = useContext(userProvider);
  const [isEditng, setIsEditing] = useState(false);
  console.log("userImage is :", user?.image);

  return (
    <section className="xsm:w-[100vw] sm:w-[30vw] bg-slate-800 xsm:h-[30vh] sm:h-[100vh] flex xsm:flex-row sm:flex-col justify-center relative items-center">
      <div className=" relative flex xsm:mt-4 sm:mt-0 p-2 justify-center items-center">
        <Image
          src={user?.image ? user?.image : "/defaultProfile.jpeg"}
          alt="profile"
          width={100}
          height={100}
          className=" w-[100px] h-[100px]  bg-cover rounded-full"
        />
        {/* <input type="file" hidden onChange={} /> */}

        <FontAwesomeIcon
          onClick={() => setIsEditing(true)}
          icon={faEdit}
          title="upload photo"
          className=" absolute top-0 right-0 cursor-pointer w-[20px] h-[20px] text-white"
        />
      </div>
      <h2 className="xsm:text-sm sm:text-4xl p-1 rounded-full m-1 text-white capitalize text-center">
        {`${user?.firstName} ${user?.lastName}`}
      </h2>
      <div className=" bg-white xsm:p-1 md:p-3 rounded-full m-1 flex  justify-center items-center text-fuchsia-800 text-center">
        <h2 className=" italic xsm:text-sm lg:text-2xl">{user?.email}</h2>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="  text-blue-500 w-[30px] h-[30px]"
        />
      </div>
      <h2 className="xsm:text-sm sm:text-2xl bg-white xsm:p-1 md:p-3 rounded-full m-1 text-fuchsia-800 text-center">
        No address
      </h2>
      <button
        onClick={() => signOut()}
        className="xsm:text-sm sm:text-xl pl-4 pr-4 p-2 text-white bg-red-400 hover:bg-red-800 rounded-lg absolute bottom-3 right-3"
      >
        Logout
      </button>
      {isEditng && <EditUserProfile setIsEditing={() => setIsEditing(false)} />}
    </section>
  );
}

export function EditUserProfile({
  setIsEditing,
}: {
  setIsEditing: () => void;
}) {
  const { user, userPage }: any = useContext(userProvider);
  const [newUserImage, setNewUserImage] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const userImageRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const handleUploadImage = () => {
    userImageRef?.current?.click();
  };

  const mutation = useMutation(
    async () => {
      if (!newUserImage) return toast.error("select a picture");
      const response = await axios.put(
        `https://yokeplay.vercel.app/api/users/${user?.email}`,
        {
          image: newUserImage,
        }
      );
      if (response.status === 200) {
        toast.success("image saved successfully");
        setIsEditing();
        return setNewUserImage(null);
      }
      if (response.status === 500) {
        return toast.error(response.statusText);
      }
      return;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["user", user?.email]),
    }
  );
  return (
    <div className="pageWarper flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white z-50">
      <section className=" flex flex-col z-50 justify-center items-center p-2 border-2 max-w-fit max-h-fit rounded-md">
        <div className=" flex  justify-center z-50 items-center flex-wrap xsm:w-[100vw] sm:w-[50vw] mb-2 ">
          {myUserProfiles.map((profile: myProfiles) => (
            <img
              src={profile.source}
              alt="profile"
              key={profile.id}
              className={
                selectedImageId === profile.id
                  ? " border-4 z-50 xsm:w-[20px] xsm:h-[20px] sm:w-[70px] sm:h-[70px] border-red-500 cursor-pointer "
                  : ""
              }
              onClick={() => {
                setSelectedImageId(profile.id);
                setNewUserImage(profile.source);
              }}
            />
          ))}
        </div>
        <button
          disabled={!newUserImage}
          onClick={() => mutation.mutate()}
          className={
            " max-w-fit p-2 z-50 text-white rounded-lg text-lg bg-green-300 " +
            (newUserImage && "hover:bg-green-500")
          }
        >
          save
        </button>
        <button
          onClick={() => setIsEditing()}
          className={
            " max-w-fit p-2 z-50 text-white fixed top-2 right-2 rounded-lg text-lg bg-yellow-300 hover:bg-yellow-500 "
          }
        >
          cancel
        </button>
      </section>
    </div>
  );
}
