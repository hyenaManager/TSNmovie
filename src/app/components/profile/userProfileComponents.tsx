"use client";
type userType = {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
};
import Image from "next/image";
import { userProvider } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";
import { myUserProfiles } from "../../../../public/mySvg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut } from "next-auth/react";

export default function UserImage() {
  const { user }: any = useContext(userProvider);
  return (
    <>
      <div className="flex items-center z-20 justify-center relative">
        <img
          alt="User avatar"
          className="h-[70px] w-[70px] rounded-full object-cover"
          src={user ? user.image : "/defaultProfile.jpeg"}
        />
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        How you defined life by
      </p>
      <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
        {user ? user.email : "....."}
      </p>
    </>
  );
}

export function UserName() {
  const { user }: any = useContext(userProvider);
  return (
    <h3 className="text-lg font-semibold uppercase">
      {user?.firstName} {user?.lastName}
    </h3>
  );
}

export function UserEditButton() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="pageWarper bg-fuchsia-500 hover:bg-fuchsia-700 text-white mt-4 w-full rounded-md px-4 py-2"
      >
        Edit Profile
      </button>
      {/* {isEditing ? (
        <EditUserProfile setIsEditing={() => setIsEditing(false)} />
      ) : null} */}
      {isEditing ? (
        <EditUserData setIsEditing={() => setIsEditing(false)} />
      ) : null}
    </>
  );
}

export function LognInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="xsm:text-sm sm:text-xl pl-4 pr-4 p-2 text-white bg-green-400 hover:bg-green-800 rounded-lg "
    >
      Logout
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="xsm:text-sm sm:text-xl pl-4 pr-4 p-2 text-white bg-red-400 hover:bg-red-800 rounded-lg absolute top-2 right-3"
    >
      Logout
    </button>
  );
}

type editUserType = {
  setIsEditing: () => void;
};

export function EditUserData({ setIsEditing }: editUserType) {
  const { user }: any = useContext(userProvider);
  const [firstName, setFirstName] = useState<string | undefined>(
    user?.firstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.lastName);
  const [userImage, setUserImage] = useState<string | undefined>(user?.image);
  const [somethingChange, setSomethingChange] = useState(false);
  const handleChangeImage = (image: string) => {
    setUserImage(image);
    setSomethingChange(true);
  };
  const queryClient = useQueryClient();
  const changeUserDatas = useMutation(
    async () => {
      const response = await axios.put(
        `https://yokeplay.vercel.app/api/users/updateUser`,
        {
          firstName: firstName,
          lastName: lastName,
          email: user?.email,
          image: userImage,
        }
      );
      if (response.status === 200) {
        return toast.success(response.data);
      } else {
        return toast.error(" there is some error!!");
      }
    },
    {
      onSettled: () => queryClient.invalidateQueries(["user", user?.email]),
    }
  );
  return (
    <div className="fixed top-0 right-0 w-full h-full z-40 justify-center bg-white items-center">
      <section className=" flex flex-col h-screen w-full justify-center mt-2 items-center">
        <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Edit User Information
          </h2>
          <div className="flex justify-center mb-4">
            <div className="relative rounded-full inline-block">
              <img
                alt="Profile Picture"
                className="rounded-full object-cover"
                height="100"
                src={userImage ? userImage : "/defaultProfile.jpeg"}
                style={{
                  aspectRatio: "100/100",
                }}
                width="100"
              />
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              changeUserDatas.mutate();
              setIsEditing();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                First name
              </label>
              <input
                required
                onChange={(e) => {
                  setSomethingChange(true);
                  setFirstName(e.target.value);
                }}
                value={firstName}
                className="mt-1 block w-full p-2 border border-gray-300 outline-fuchsia-500 rounded"
                id="name"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Last name
              </label>
              <input
                required
                onChange={(e) => {
                  setSomethingChange(true);
                  setLastName(e.target.value);
                }}
                value={lastName}
                className="mt-1 block w-full p-2 border border-gray-300 outline-fuchsia-500 rounded"
                id="lastName"
                placeholder="john.doe@example.com"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="profilePicture"
              >
                select new profile picture
              </label>
              <UserImageSelection setUserImage={handleChangeImage} />
            </div>
            <div className="flex items-center justify-between">
              {somethingChange ? (
                <button
                  className="bg-[#ff00ff] text-white px-4 py-2 rounded hover:bg-[#cc00cc]"
                  type="submit"
                >
                  Save
                </button>
              ) : (
                <div></div>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing();
                }}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-yellow-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function UserImageSelection({
  setUserImage,
}: {
  setUserImage: (image: string) => void;
}) {
  const [profiles, setProfiles] = useState(myUserProfiles.slice(0, 4));
  const [isNext, setIsNext] = useState(true); //for button next slide or back slide
  useEffect(() => {
    if (isNext) {
      setProfiles(myUserProfiles.slice(0, 4));
    } else {
      setProfiles(myUserProfiles.slice(4, 7));
    }
  }, [isNext]);
  return (
    <>
      <button
        className="text-blue-500 text-lg flex justify-center items-center w-full"
        onClick={(e) => {
          e.stopPropagation();
          setIsNext(!isNext);
        }}
        type="button"
      >
        {isNext ? (
          <>
            <h4>Next</h4>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-[20px] h-[20px]"
            />
          </>
        ) : (
          <>
            <h4>Previous</h4>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-[20px] h-[20px]"
            />
          </>
        )}
      </button>
      <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto p-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border border-zinc-200 rounded-full overflow-hidden dark:border-zinc-800"
          >
            <input
              className="sr-only"
              id="image-1"
              name="profileImage"
              type="radio"
            />
            <label htmlFor="image-1">
              <img
                alt="Profile Image 1"
                onClick={() => setUserImage(profile.source)}
                className="object-cover w-full h-full cursor-pointer"
                height="200"
                src={profile.source}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="100"
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
