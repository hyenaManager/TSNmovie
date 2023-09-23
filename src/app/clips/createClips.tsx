"use client";

import { useState } from "react";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import Loading from "../components/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Uploading from "../components/uploading";

export default function CreateClips({
  isCreating,
}: {
  isCreating: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession(); //get user data from session avaiable - {name,image,email,id...}
  const [clipName, setclipName] = useState(""); //name of the clip that a user give
  const [isSubmiting, setIsSubmiting] = useState(false); //is user is start creating a clip or not
  const [movieVideo, setMovieVideo] = useState<File | undefined>(undefined); //choose a video from user
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    //first get user data with related page from database
    queryKey: ["user", session?.user.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://yokeplay.vercel.app/api/users/${session?.user.email}`
        );
        const data = response.data;
        // console.log("user data in clips.", data);

        return data;
      } catch (error) {
        return error;
      }
    },
  });

  async function postMovie(url: string) {
    const response = await axios.post("http://yokeplay.vercel.app/api/clips", {
      title: clipName, //title of clip name
      pageOwnerId: data?.Page?.id, //user's page id , get from fetching user's data with realated page check above code
      video: url, //url is link from firebase video that has been uploaded
    });
    if (response.status === 200) {
      setIsSubmiting(false); //when creating clips in database is over remove loading mode
      isCreating(); // and disabled creating mode, this function come from prop
    } else {
      setIsSubmiting(false); //when error remove loading mode
      alert(`error - ${response.data}`); // alert error dev mode
    }
  }

  const mutation = useMutation(
    async () => {
      if (movieVideo == null) return setIsSubmiting(false);
      const fileName = `clips/${movieVideo?.name + v4()}`; //making a file path name for video ,v4 is random string generator something like (11lj-l4lj-23;j-faaf)
      const imageRef = ref(storage, fileName);
      // console.log(fileName, " is file name....");

      // Create an upload task and set up progress tracking
      const uploadTask = uploadBytesResumable(imageRef, movieVideo as any);
      // set up an event listener to track upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
        },
        (error) => {
          console.log(error);
          setIsSubmiting(false);
          return error;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            postMovie(url); //url is the actual path for a video that anyone can access in browser
          });
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["clips"]);
      },
    }
  );
  //if the clips is created, show the uploading progressing bar
  if (isSubmiting) return <Uploading />;

  return (
    <>
      <div
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
        {/* {isSubmiting && <Loading />} */}
      </div>
    </>
  );
}
