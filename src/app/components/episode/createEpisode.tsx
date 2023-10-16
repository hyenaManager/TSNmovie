"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Uploading, { ProgressingUpload } from "../uploading";
import { storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { useCurrentUploadings } from "@/app/store";

export default function CreateEpisode({
  handleVisibility,
  seriesId,
}: {
  handleVisibility: () => void;
  seriesId: string;
}) {
  const [episodeName, setEpisodeName] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | undefined>(
    undefined
  );
  const addToUploadingList = useCurrentUploadings(
    (state) => state.updateCurrentUploading
  );

  const videoRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const handleVideoUpload = () => {
    videoRef.current?.click();
  };

  const createEpisode = async (url: string) => {
    const response = await axios.post(
      `https://yokeplay.vercel.app/api/episodes`,
      {
        name: episodeName,
        episodeNumber: episodeNumber,
        seriesId: seriesId,
        video: url,
      }
    );
    if (response.status === 200) {
      toast.success("create successfully");
      queryClient.invalidateQueries(["series", seriesId]);
    }
    if (response.status === 500) {
      toast.error(response.statusText);
    }
  };

  async function handleUploadToFirebase() {
    const fileName = `episodes/${uploadedVideo?.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, uploadedVideo as File);
    // set up an event listener to track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        addToUploadingList({
          title: episodeName,
          percent: percent.toFixed(0),
          id: uploadedVideo?.name,
        });
        //is video upload success disable all loading status
        if (parseInt(percent.toFixed(0)) == 100) {
          setIsSubmiting(false);
        }
      },
      (error) => {
        console.log(error);
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          createEpisode(url); //url is the actual path for a video that anyone can access in browser
        });
      }
    );
  }

  const mutation = useMutation(handleUploadToFirebase, {
    onError: (error: any) => {
      console.log(error);
      setIsSubmiting(false);
      // handleVisibility();
    },
  });
  const handleCreateEpisode = () => {
    if (!uploadedVideo) {
      return toast.error("please select a video");
    } else {
      console.log("also shere");
      mutation.mutate();
      handleVisibility();
    }
  };

  // if (isSubmiting) return <ProgressingUpload percent={progressingPercent} />;
  return (
    <div className="pageWarper fixed top-0 left-0 bg-white z-50  flex justify-center flex-col items-center w-[100vw] h-[100vh] ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateEpisode();
        }}
        className=" xsm:w-[90vw] sm:w-[60vw] rounded-lg flex bg-fuchsia-200 flex-col  justify-center items-center border-2 border-fuchsia-500"
      >
        <div className=" flex xsm:flex-col sm:flex-row justify-center items-center">
          <label className=" text-center text-lg w-full text-fuchsia-800 items-center">
            Episode name
          </label>
          <input
            value={episodeName}
            onChange={(e) => setEpisodeName(e.target.value)}
            required
            type="text"
            placeholder="episode name"
            className="p-1 outline-none rounded-md w-full bg-white text-fuchsia-600 border-2 border-fuchsia-600  m-2"
          />
          <label className=" text-center text-lg w-full text-fuchsia-800 items-center">
            Episode number
          </label>
          <input
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            required
            type="number"
            placeholder="episode number"
            className="p-1 outline-none rounded-md w-full bg-white text-fuchsia-600 border-2 border-fuchsia-600  m-2"
          />
        </div>
        <div className=" w-full bg-white m-2 h-3hundred border re flex justify-center items-center relative">
          <button
            type="button"
            onClick={() => handleVideoUpload()}
            className=" text-fuchsia-600 z-10 hover:bg-fuchsia-600 hover:text-white xsm:text-sm sm:text-lg absolute top-1 right-1 p-2 rounded-md border-2 border-fuchsia-600 m-1"
          >
            select video +
          </button>
          {uploadedVideo ? (
            <video
              src={URL.createObjectURL(uploadedVideo)}
              controls
              className=" absolute h-full"
            />
          ) : (
            <h4 className="text-2xl text-center text-fuchsia-500">
              Upload video
            </h4>
          )}
          <input
            hidden
            type="file"
            accept="video/*"
            ref={videoRef}
            onChange={(e) => setUploadedVideo(e.target.files?.[0])}
          />
        </div>
        <button
          type="submit"
          className=" p-2 rounded-md bg-fuchsia-500 hover:bg-fuchsia-600 text-white text-lg m-2"
        >
          Create
        </button>
      </form>
      <button
        className=" p-2 rounded-md bg-yellow-500 fixed top-2 right-2 text-white text-lg m-2"
        onClick={handleVisibility}
      >
        Cancel
      </button>
    </div>
  );
}
