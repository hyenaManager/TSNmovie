"use client";

import { useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Loading from "../components/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function CreateMovie({
  isCreating,
}: {
  isCreating: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [clipName, setclipName] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [movieVideo, setMovieVideo] = useState<File | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ["user", session?.user.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${session?.user.email}`
        );
        const data = response.data;
        console.log("user data in clips.", data);

        return data;
      } catch (error) {
        return error;
      }
    },
  });

  async function postMovie(url: string) {
    const response = await axios.post("http://localhost:3000/api/clips", {
      title: clipName,
      pageOwnerId: data?.Page?.[0].id,
      video: url,
    });
    if (response.status === 200) {
      setIsSubmiting(false);
      isCreating();
    } else {
      setIsSubmiting(false);
      alert(`error - ${response.data}`);
    }
  }

  const mutation = useMutation(
    async () => {
      if (movieVideo == null) return setIsSubmiting(false);
      const fileName = `pages/${movieVideo?.name + v4()}`;
      const imageRef = ref(storage, fileName);
      console.log(fileName, " is file name....");
      try {
        uploadBytes(imageRef, movieVideo as any).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            postMovie(url);
          });
        });
      } catch (error) {
        alert(error);
        console.log(" errorr here :(");
        setIsSubmiting(false);
      }
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["clips"] });
      },
    }
  );
  return (
    <>
      <main
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmiting(true);
          mutation.mutate();
        }}
        className="top-0 z-30 left-0 h-full w-full flex justify-center items-center fixed backdrop-blur-sm "
      >
        <form className=" flex flex-col justify-center items-center  w-[50%] h-[70%] shadow-[0px_0px_10px_purple] rounded-lg ">
          <label
            className=" text-white p-2 ml-2 "
            style={{ textShadow: "2px 2px 8px purple" }}
          >
            title
          </label>
          <input
            required
            value={clipName}
            onChange={(e) => setclipName(e.target.value)}
            className=" flex flex-start w-2hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
            type="text"
          />
          <input
            required
            accept="video/*"
            onChange={(e) => setMovieVideo(e.target.files?.[0])}
            className=" bg-black text-fuchsia-500 p-2 cursor-pointer mt-2"
            type="file"
          />
          <button
            disabled={isSubmiting}
            type="submit"
            className=" text-white hover:bg-fuchsia-400 p-2 w-[90px] h-[50px] bg-fuchsia-600 rounded-md m-3"
          >
            create
          </button>
        </form>
        {isSubmiting && <Loading />}
      </main>
    </>
  );
}
