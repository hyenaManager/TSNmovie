"use client";

import { useRef, useState } from "react";
import { storage } from "../../firebase";
import ReactPlayer from "react-player";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import Loading from "../loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Uploading from "../uploading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ClipVideoLengthReminder from "../reminders";

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
  const [showAlert, setShowAlert] = useState(false);
  const [hasValidDuration, setHasValidDuration] = useState<boolean | null>(
    true
  );
  //make a click to the hidden input(video file uploader)
  const handleUpload = () => {
    uploadRef.current?.click();
  };
  //fetch user data
  const { data, status } = useQuery({
    //first get user data with related page from database
    queryKey: ["user", session?.user.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${session?.user.email}`
        );
        const data = response.data;
        // console.log("user data in clips.", data);

        return data;
      } catch (error) {
        return error;
      }
    },
  });
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
          setShowAlert(true);
          setClipVideo(undefined);
        }
      });

      videoElement.src = objectURL;
    }
  };

  async function postMovie(url: string) {
    const response = await axios.post("http://localhost:3000/api/clips", {
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
        <form className=" bg-black flex flex-col justify-start relative xsm:w-[99%]  sm:w-[50%] h-[70%] shadow-[0px_0px_10px_purple] rounded-lg ">
          <label
            className=" text-white p-2 ml-2 text-xl "
            style={{ textShadow: "2px 2px 8px purple" }}
          >
            Title
          </label>
          <input
            required
            value={clipName}
            onChange={(e) => setclipName(e.target.value)}
            className=" flex flex-start w-2hundred ml-2 mr-2 text-lg p-2 text-fuchsia-800 font-bold outline-none bg-none"
            type="text"
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
          <div className=" m-2 xsm:h-[70%] sm:h-[250px] flex flex-col justify-center items-center bg-white rounded-md">
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
              className=" h-[60px] w-[60px] text-white"
            />
          </button>
          {showAlert && (
            <ClipVideoLengthReminder
              handleVisibility={() => setShowAlert(false)}
            />
          )}
        </form>
      </div>
    </>
  );
}
