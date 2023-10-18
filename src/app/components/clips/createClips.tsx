"use client";

import { useContext, useRef, useState } from "react";
import { storage } from "../../firebase";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Uploading from "../uploading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import toast from "react-hot-toast";
import { userProvider } from "@/app/context/userContext";

export default function CreateClips({
  isCreating,
}: {
  isCreating: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession(); //get user data from session avaiable - {name,image,email,id...}
  const [clipName, setclipName] = useState(""); //name of the clip that a user give
  const [isSubmiting, setIsSubmiting] = useState(false); //is user is start creating a clip or not
  const [clipVideo, setClipVideo] = useState<File | undefined>(undefined); //choose a video from user
  const queryClient = useQueryClient();
  const uploadRef = useRef<HTMLInputElement | null>(null); //to upload video file
  const { userPage }: any = useContext(userProvider); //current userPage
  //make a click to the hidden input(video file uploader)
  const handleUpload = () => {
    uploadRef.current?.click();
  };
  //check clipVideo length validations
  const handleFileChange = (video: any) => {
    const file = video;

    if (file && uploadRef.current?.files) {
      const objectURL = URL.createObjectURL(file);
      const videoElement = document.createElement("video");

      videoElement.addEventListener("loadedmetadata", () => {
        const duration = videoElement.duration;
        console.log("video duration is :", duration);

        const isNotValid: boolean = parseInt(duration.toFixed(0)) > 180; //is video duration is longer than 3 minutes
        if (isNotValid) {
          toast.error("your video is longer than 3minutes 📢", {
            duration: 5000,
          });
          setClipVideo(undefined);
        }
      });

      videoElement.src = objectURL;
    }
  };

  async function postMovie(url: string) {
    const response = await axios.post("http://localhost:3000/api/clips", {
      title: clipName, //title of clip name
      pageOwnerId: userPage?.id, //current user's page id , value from user context provider
      video: url, //url is link from firebase video that has been uploaded
    });
    if (response.status === 200) {
      setIsSubmiting(false); //when creating clips in database is over remove loading mode
      toast.success("video uploaded successfully 💯");
      isCreating(); // and disabled creating mode, this function come from prop
    } else {
      setIsSubmiting(false); //when error remove loading mode
      alert(`error - ${response.data}`); // alert error dev mode
    }
  }

  const mutation = useMutation(
    async () => {
      if (clipVideo == null) return setIsSubmiting(false);
      const fileName = `clips/${clipVideo?.name + v4()}`; //making a file path name for video ,v4 is random string generator something like (11lj-l4lj-23;j-faaf)
      const imageRef = ref(storage, fileName);
      // console.log(fileName, " is file name....");

      // Create an upload task and set up progress tracking
      const uploadTask = uploadBytesResumable(imageRef, clipVideo as any);
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
      onSuccess: () =>
        // Invalidate and refetch
        queryClient.invalidateQueries(["clips"]),
    }
  );
  //if the clips is start uploading or creating, show the uploading progressing bar
  if (isSubmiting) return <Uploading />;

  return (
    <>
      <div
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmiting(true);
          mutation.mutate();
        }}
        className="top-0 z-30 left-0 h-full w-full flex justify-center items-center fixed bg-white "
      >
        <form className=" bg-white shadow-xl flex flex-col justify-start relative xsm:w-[99%]  sm:w-[50%] rounded-lg ">
          <label
            className=" text-slate-500 p-2 ml-2 text-xl "
            style={{ textShadow: "2px 2px 8px purple" }}
          >
            Title
          </label>
          <textarea
            required
            value={clipName}
            autoFocus
            onChange={(e) => {
              setclipName(e.target.value);
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            style={{
              resize: "none",
              height: "auto",
            }}
            className=" border flex overflow-y-hidden flex-start ml-2 mr-2 text-lg p-2 text-fuchsia-800 font-bold outline-none bg-none"
          />
          <input
            required
            ref={uploadRef}
            accept="video/*"
            onChange={(e) => {
              setClipVideo(e.target.files?.[0]);
              handleFileChange(e.target.files?.[0]);
            }}
            className=" bg-black text-fuchsia-500 p-2 cursor-pointer mt-2"
            hidden
            type="file"
          />
          <div className=" border m-2 xsm:h-[70%] sm:h-[250px] flex flex-col justify-center items-center bg-white rounded-md">
            <h3 className=" text-lg text-fuchsia-400 text-center items-center">
              upload video
            </h3>
            <Image
              src={"/upload.svg"}
              onClick={handleUpload}
              className=" cursor-pointer"
              title="upload clips"
              alt="upload"
              width={100}
              height={100}
            />
            {clipVideo && (
              <>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className=" w-[30px] h-[30px] text-green-400"
                />
                <h4 className=" text-sm text-green-400 text-center p-1">
                  {clipVideo.name}
                </h4>
              </>
            )}
          </div>

          <button
            disabled={isSubmiting}
            type="submit"
            className=" text-white absolute bottom-1 right-3 hover:bg-fuchsia-400 p-2 w-[90px] h-[50px] bg-green-600 rounded-md m-3"
          >
            create
          </button>
          <button
            className=" cancelButton absolute top-2 right-2"
            onClick={() => isCreating()}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className=" h-[40px] w-[40px] text-yellow-400"
            />
          </button>
        </form>
      </div>
    </>
  );
}
