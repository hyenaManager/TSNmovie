"use client";

import { useEffect, useRef, useState } from "react";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faEdit,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { storage } from "@/app/firebase";
import { useCreatingPage } from "@/app/store";
import { uploadFileToFirebase } from "@/app/utility/uploadToFirebase";
import Uploading from "@/app/components/uploading";
export default function GettingStart() {
  const pageCoverImage = useCreatingPage((state) => state.coverImage);
  const { data: session } = useSession();
  const [pageName, setPageName] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null); //link of profile image to firebase
  const uploadProfilePic = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const setCreatedPageId = useCreatingPage((state) => state.setPageId);
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");

  //when the user click on the edit button invoke input element to select pictures
  const handleUploadProfilePic = () => {
    uploadProfilePic.current?.click();
  };
  console.log("profileUrl", profileImgUrl);
  console.log("coverUrl", coverImgUrl);

  //create new page
  async function createPage(coverImgUrl: string, profileImgUrl: string) {
    const finalForm = {
      name: pageName,
      adminId: session?.user.id,
      image: profileImgUrl,
      coverImage: coverImgUrl,
    };
    console.log("final form of creating page:", finalForm);

    const response = await axios.post("https://yokeplay.vercel.app/api/pages", {
      name: pageName,
      adminId: session?.user.id,
      image: profileImgUrl,
      coverImage: coverImgUrl,
    });
    if (response.status === 200) {
      toast.success("creating page success !!");
      setCreatedPageId(response.data.id);
      toast.success("page is created successfully 👌");
      router.push("/gettingStart/contact");
    } else {
      setIsSubmiting(false);
      toast.error(`error - ${response.data}`);
    }
  }

  const handleUploadPictures = async () => {
    //for coverImage
    await uploadFileToFirebase(pageCoverImage!, "page", setCoverImgUrl);
    //for profileImage
    await uploadFileToFirebase(profileImage!, "page", setProfileImgUrl);
  };
  // async function handleUploadPicToFirebase(image: File) {
  //   if (profileImageUrl !== "") {
  //     const coverImageRef = ref(storage, profileImageUrl);
  //     deleteObject(coverImageRef)
  //       .then(() => {
  //         toast.success("deleted the previous picture");
  //       })
  //       .catch((error) => {
  //         toast.error(error);
  //       });
  //   }
  //   const fileName = `pages/${image?.name + v4()}`;
  //   const imageRef = ref(storage, fileName);
  //   // console.log(fileName, " is file name....");
  //   const snapshot = await uploadBytes(imageRef, image as any);
  //   const url = await getDownloadURL(snapshot.ref);
  //   toast.success("success ");
  //   setProfileImageUrl(url);
  // }
  // const mutation = useMutation(
  //   async () => {
  //     setIsSubmiting(true);
  //     await handleUploadPictures();
  //   },
  //   {
  //     onSettled: () => {
  //       toast.success("page is created successfully 👌");
  //       router.push("/gettingStart/contact");
  //     },
  //     onError: () => toast.error("Opps there is error in page creation "),
  //   }
  // );

  useEffect(() => {
    if (profileImgUrl && coverImgUrl) {
      createPage(profileImgUrl, coverImgUrl);
    }
  }, [profileImgUrl, coverImgUrl]);
  return (
    <>
      <div className="pageWarper z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center">
        {!profileImage && (
          <h2 className="text-red-400 text-xl">
            * please choose profile picture and page name
          </h2>
        )}
        <div className=" flex flex-col border bg-center rounded-t-xl justify-center xsm:h-[50vh] sm:h-[70vh] xsm:w-[95vw] sm:w-[40vw] items-center relative">
          <Image
            fill
            alt={"bg image"}
            style={{
              objectFit: "cover",
            }}
            quality={100}
            className=" rounded-t-xl object-cover"
            src={URL.createObjectURL(pageCoverImage!) || "/defaultProfile.jpeg"}
          />

          {/* coverImage edit button */}

          <div className=" imageOverlay relative ">
            {/* image uploader */}
            <input
              type="file"
              accept="image/*"
              ref={uploadProfilePic}
              onChange={(e) => {
                setProfileImage(e?.target?.files?.[0] as File);
              }}
              hidden
            />

            <Image
              //if uploaded image exist? the user can preview the image
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : "/defaultProfile.jpeg"
              }
              width={200}
              height={200}
              alt="hat"
              className=" w-[130px] h-[130px] m-1 rounded-full bg-cover bg-white p-1"
            />

            <FontAwesomeIcon
              icon={faUpload}
              onClick={handleUploadProfilePic}
              className=" w-[20px] h-[20px] p-1 text-white bg-black rounded-full cursor-pointer absolute top-1 right-1"
            />
          </div>
          <input
            onChange={(e) => setPageName(e.target.value)}
            placeholder="page name"
            className=" outline-none p-2 z-50 border-2 rounded-lg text-lg text-fuchsia-500"
            type="text"
          />
        </div>
        {profileImage && pageName && (
          <button
            onClick={() => handleUploadPictures()}
            className=" p-2 rounded-lg bg-green-400 hover:bg-green-600  text-white"
          >
            Create page now
          </button>
        )}
        <button
          className=" p-2 rounded-lg fixed top-1 left-1 bg-black text-white"
          onClick={() => router.back()}
        >
          go back
        </button>
      </div>
      {isSubmiting && <Uploading />}
    </>
  );
}
