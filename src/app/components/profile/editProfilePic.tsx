import { userProvider } from "@/app/context/userContext";
import { storage } from "@/app/firebase";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";
const { user, userPage }: any = useContext(userProvider);
export function UserPic() {
  const [profilePic, setProfilePic] = useState<File | undefined>(undefined);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [editingPic, setEditingPic] = useState(false);
  const queryClient = useQueryClient();
  async function handleUploadImageToFirebase(profilePic: File) {
    if (profilePicUrl !== "") {
      const coverImageRef = ref(storage, profilePicUrl);
      deleteObject(coverImageRef)
        .then(() => {
          toast.success("deleted the previous picture");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
    const fileName = `pages/${profilePic?.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, profilePic as any);
    // set up an event listener to track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
      },
      (error) => {
        console.log(error);

        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          toast.success("uploaded successfully!");
          setProfilePicUrl(url); //url is the actual path for a video that anyone can access in browser
        });
      }
    );
  }
  // const changeProfilePic = async ()=>{
  //   const response = await axios.put(`http://localhost:300/api/users/${user?.email}`,{

  //   })
  // }
  // const mutation = useMutation(changeProfilePic, {
  //   onSuccess: () => {
  //     toast.success("pic changed successfully");
  //     queryClient.invalidateQueries(["user"]);
  //   },
  // });
  return (
    <div className=" relative flex p-2 justify-center items-center">
      <Image
        src={profilePicUrl ? profilePicUrl : user?.image}
        alt="profile"
        width={100}
        height={100}
        className=" bg-cover rounded-full"
      />
      <input
        type="file"
        hidden
        onChange={(e) =>
          handleUploadImageToFirebase(e.target.files?.[0] as File)
        }
      />
      {!editingPic || !profilePicUrl ? (
        <FontAwesomeIcon
          icon={faEdit}
          title="upload photo"
          className=" absolute top-0 right-0 cursor-pointer w-[20px] h-[20px] text-white"
        />
      ) : (
        <button
          onClick={() => {
            setEditingPic(false);
            // mutation.mutate();
          }}
          className="text-white bg-green-500 hover:bg-green-600 rounded-md text-sm p-3 absolute top-1 right-1"
        >
          save
        </button>
      )}
    </div>
  );
}
