"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { storage } from "@/app/firebase";
import Link from "next/link";
import { useCreatingPage } from "@/app/store";
import { useRouter } from "next/navigation";
export default function GettingStart() {
  const router = useRouter();
  const [profileCoverImageUrl, setProfileCoverImageUrl] = useState<File | null>(
    null
  ); //link of profile cover image to firebase
  const uploadCoverPic = useRef<HTMLInputElement | null>(null);
  const setNewCoverImage = useCreatingPage((state) => state.setCoverImage);

  const handleUploadCoverPic = () => {
    uploadCoverPic.current?.click();
  };

  //upload to firebase
  // async function handleUploadImageToFirebase(coverPic: File) {
  //   if (profileCoverImageUrl !== "") {
  //     const coverImageRef = ref(storage, profileCoverImageUrl);
  //     deleteObject(coverImageRef)
  //       .then(() => {
  //         toast.success("deleted the previous picture");
  //       })
  //       .catch((error) => {
  //         toast.error(error);
  //       });
  //   }
  //   const fileName = `pages/${coverPic?.name + v4()}`;
  //   const imageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(imageRef, coverPic as any);
  //   // set up an event listener to track upload progress
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log(percent + "% done");
  //     },
  //     (error) => {
  //       console.log(error);
  //       setIsSubmiting(false);
  //       toast.error(error.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         toast.success("uploaded successfully!");
  //         setProfileCoverImageUrl(url); //url is the actual path for a video that anyone can access in browser
  //       });
  //     }
  //   );
  // }
  console.log(profileCoverImageUrl, "is url");
  return (
    <>
      <div className="pageWarper z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center">
        <h2 className="text-black text-2xl">Upload your cover photo</h2>
        <div className=" flex flex-col border bg-center rounded-t-xl justify-center h-[60vh] xsm:w-[95vw] sm:w-[40vw] items-center relative">
          {profileCoverImageUrl && (
            <Image
              fill
              alt={"bg image"}
              style={{
                objectFit: "cover",
              }}
              quality={100}
              className=" rounded-xl"
              src={URL.createObjectURL(profileCoverImageUrl)}
            />
          )}
          {/* coverImage edit button */}
          <FontAwesomeIcon
            onClick={handleUploadCoverPic}
            icon={faUpload}
            className=" w-[20px] h-[20px] p-2 text-white bg-black rounded-full cursor-pointer absolute top-1 right-1"
          />
          <input
            type="file"
            accept="image/*"
            ref={uploadCoverPic}
            onChange={(e) => {
              setNewCoverImage(e.target.files?.[0] as File);
              setProfileCoverImageUrl(e.target.files?.[0] as File);
            }}
            hidden
          />
          <div className="h-[100px] w-[100px] border-2 bg-opacity-40 bg-fuchsia-400 rounded-full absolute top-50 right-50"></div>
        </div>
        <button
          className=" p-2 rounded-lg fixed top-1 left-1 bg-black text-white"
          onClick={() => router.back()}
        >
          go back
        </button>
        <Link
          href={{
            pathname: `/gettingStart/profilePicture`,
            query: {
              coverImage: "profileCoverImageUrl",
            },
          }}
          // onClick={() => mutation.mutate()}
          className=" p-2 rounded-lg fixed bottom-4 right-2 bg-green-500 text-white"
        >
          Next
        </Link>
      </div>
    </>
  );
}
