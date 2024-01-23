"use client";
import { userProvider } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import UserImageSelection from "./userImageSelection";
import { revalidateNavUser } from "@/serverActions/revalidateUserInfo";
import { useRouter } from "next/navigation";

export default function EditUserData() {
  const { user }: any = useContext(userProvider);
  const [firstName, setFirstName] = useState<string | undefined>(
    user?.firstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.lastName);
  const [userImage, setUserImage] = useState<string | undefined>(user?.image);
  const [somethingChange, setSomethingChange] = useState(false);
  const router = useRouter();
  const handleChangeImage = (image: string) => {
    setUserImage(image);
    setSomethingChange(true);
  };
  const queryClient = useQueryClient();
  const changeUserDatas = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `http://localhost:3000/api/users/updateUser`,
        {
          firstName: firstName,
          lastName: lastName,
          email: user?.email,
          image: userImage,
        }
      );
      if (response.status === 200) {
        toast.success(response.data);
        router.push("/profile");
        return await revalidateNavUser();
      } else {
        return toast.error(" there is some error!!");
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user", user?.email] }),
  });
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
                  router.back();
                }}
                type="button"
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
