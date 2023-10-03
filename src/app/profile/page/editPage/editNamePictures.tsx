"use client";
import { userProvider } from "@/app/context/userContext";
import { storage } from "@/app/firebase";
import { faArrowsRotate, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import Image from "next/image";

export default function ProfilePictureSection() {
  const { user, userPage }: any = useContext(userProvider);
  const [uploadedProfileImg, setUploadedProfileImg] = useState<
    File | undefined
  >(undefined);
  const [uploadedCoverImg, setUploadedCoverImg] = useState<File | undefined>(
    undefined
  );
  const [editingCoverImage, setEditingCoverImage] = useState(false); //for toglling edit and save buttons
  const [editingProfileImage, setEditingProfileImage] = useState(false); //for toggling edit and save buttons
  const imgUploadProfilePic = useRef<HTMLInputElement | null>(null); //refrence for input that select profile pic
  const imgUploadCoverPic = useRef<HTMLInputElement | null>(null); //refrence for input that select profile cover pic
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [typeOfPicture, setTypeOfPicture] = useState(""); //set type of uploaded picture , profile pic or profile cover pic
  const queryClient = useQueryClient();
  const handleUploadProfilePic = () => {
    imgUploadProfilePic.current?.click();
  };
  const handleUploadCoverPic = () => {
    imgUploadCoverPic.current?.click();
  };
  const handleResetPicture = () => {
    setUploadedCoverImg(undefined);
    setUploadedProfileImg(undefined);
  };
  const changeProfilePicture = async (imageUrl: string) => {
    try {
      await axios.put(`http://localhost:3000/api/pages/${userPage?.id}`, {
        image: imageUrl,
        pageId: userPage?.id,
        name: null,
        updateType: typeOfPicture,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  console.log("cover image :", userPage?.coverImage);

  const mutation = useMutation(
    async () => {
      let targetImg: any = null;
      //if cover pic is already exist, delete the existing cover picture
      if (typeOfPicture === "cover" && userPage.coverImage) {
        targetImg = uploadedCoverImg;
        const coverImageRef = ref(storage, userPage?.coverImage);
        deleteObject(coverImageRef)
          .then(() => {
            toast.success("deleted the previous picture");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
      //if profile pic is already exist, delete the existing cover picture
      if (typeOfPicture === "notCover" && userPage.image) {
        targetImg = uploadedProfileImg;
        //delete the existing profile picture
        const coverImageRef = ref(storage, userPage?.image);
        deleteObject(coverImageRef)
          .then(() => {
            toast.success("deleted the previous picture");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
      console.log("target Image is: ", targetImg, typeof targetImg);

      const fileName = `pages/${targetImg?.name + v4()}`; //making a file path name for video ,v4 is random string generator something like (11lj-l4lj-23;j-faaf)
      const imageRef = ref(storage, fileName);
      // console.log(fileName, " is file name....");

      // Create an upload task and set up progress tracking
      const uploadTask = uploadBytesResumable(imageRef, targetImg as any);
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
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url, "is loaded");

            changeProfilePicture(url); //url is the actual path for a video that anyone can access in browser
          });
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        setUploadedCoverImg(undefined);
        setUploadedProfileImg(undefined);
        queryClient.invalidateQueries(["page"]);
        toast.success("saved successfully 👍", {
          duration: 4000,
        });
      },
      onError: (error: any) => {
        setUploadedCoverImg(undefined);
        setUploadedProfileImg(undefined);
        toast.error(error.message);
      },
    }
  );

  return (
    <div className=" flex flex-col border bg-center rounded-t-xl justify-center h-[35vh] xsm:w-[95vw] sm:w-[40vw] items-center relative">
      <Image
        fill
        alt="cover"
        quality={100}
        style={{
          objectFit: "cover",
        }}
        src={
          uploadedCoverImg
            ? URL.createObjectURL(uploadedCoverImg)
            : userPage?.coverImage || "/defaultProfile.jpeg"
        }
        className="bg-cover rounded-t-xl"
      />
      <FontAwesomeIcon
        icon={faArrowsRotate}
        title="reset image"
        className=" w-[20px] h-[20px] bg-black text-white rounded-full p-2 top-1 left-1 absolute cursor-pointer"
        onClick={handleResetPicture}
      />
      {/* coverImage edit button */}
      {!editingCoverImage || !uploadedCoverImg ? (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => {
            handleUploadCoverPic();
            setEditingCoverImage(true);
          }}
          className=" w-[20px] h-[20px] p-2 text-white bg-black rounded-full cursor-pointer absolute top-1 right-1"
        />
      ) : (
        <button
          onClick={() => {
            setEditingCoverImage(false);
            setTypeOfPicture("cover");
            mutation.mutate();
          }}
          className="text-white bg-green-500 hover:bg-green-600 rounded-md text-sm p-3 absolute top-1 right-1"
        >
          save
        </button>
      )}
      <div className=" imageOverlay relative ">
        {/* image uploader */}
        <input
          type="file"
          accept="image/*"
          ref={imgUploadProfilePic}
          value={undefined}
          onChange={(e) =>
            setUploadedProfileImg((e?.target?.files?.[0] as File) || undefined)
          }
          hidden
        />
        <input
          type="file"
          accept="image/*"
          ref={imgUploadCoverPic}
          onChange={(e) =>
            setUploadedCoverImg((e?.target?.files?.[0] as File) || null)
          }
          hidden
        />
        <Image
          //if uploaded image exist? the user can preview the image
          src={
            uploadedProfileImg
              ? URL.createObjectURL(uploadedProfileImg as any)
              : userPage?.image
          }
          style={{
            objectFit: "cover",
          }}
          width={200}
          height={200}
          alt="hat"
          className=" w-[100px] h-[100px] m-1 rounded-full bg-white p-1"
        />
        {!editingProfileImage || !uploadedProfileImg ? (
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => {
              handleUploadProfilePic();
              setEditingProfileImage(true);
            }}
            className=" w-[20px] h-[20px] p-1 text-white bg-black rounded-full cursor-pointer absolute top-1 right-1"
          />
        ) : (
          <button
            onClick={() => {
              setEditingProfileImage(false);
              setTypeOfPicture("notCover");
              mutation.mutate();
            }}
            className=" text-white bg-green-500 hover:bg-green-600 rounded-md text-sm p-1 absolute top-1 right-1"
          >
            save
          </button>
        )}
      </div>
      <ChangProfileName />
    </div>
  );
}

function ChangProfileName() {
  const { userPage }: any = useContext(userProvider);
  const [pageName, setPageName] = useState("");
  const [editingProfileName, setEditingProfileName] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      const response = await axios.put(
        `http://localhost:3000/api/pages/${userPage?.id}`,
        {
          image: null,
          pageId: userPage?.id,
          name: pageName,
          updateType: "name",
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("page's name changed successfully ");
        queryClient.invalidateQueries(["page"]);
      },
      onError: (error: any) => {
        toast.error(`error-${error.message}`, {
          duration: 5000,
        });
      },
    }
  );

  useEffect(() => setPageName(userPage?.name), [userPage]);
  return (
    <div className=" flex justify-between z-50 w-[200px] bg-yellow-100 rounded-lg items-center ">
      <input
        type="text"
        value={pageName}
        disabled={!editingProfileName}
        onChange={(e) => setPageName(e.target.value)}
        className={
          "text-lg text-slate-800 outline-none rounded-l-lg w-[120px] text-center " +
          (editingProfileName && "bg-green-400")
        }
      />
      {/* //check conditions whether to show edit button or save button */}
      {userPage?.name === pageName || !editingProfileName ? (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => setEditingProfileName(!editingProfileName)}
          className=" w-[20px] h-[20px] p-2 text-green-500 cursor-pointer"
        />
      ) : (
        <button
          onClick={() => {
            setEditingProfileName(false);
            mutation.mutate();
          }}
          className=" text-white bg-green-500 hover:bg-green-600 rounded-md text-sm p-1 m-1 "
        >
          save
        </button>
      )}
    </div>
  );
}
