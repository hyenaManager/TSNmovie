"use client";

import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Loading from "../components/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function GettingStart() {
  const router = useRouter();
  const { data: session } = useSession();
  const [pageName, setPageName] = useState("");
  const [pageImage, setPageImage] = useState<File | undefined>(undefined);
  const [isSubmiting, setIsSubmiting] = useState(false);

  //create new page
  async function postPage(url: string) {
    const response = await axios.post("http://localhost:3000/api/pages", {
      name: pageName,
      adminId: session?.user.id,
      image: url,
    });
    if (response.status === 200) {
      router.push("/profile");
    } else {
      setIsSubmiting(false);
      alert(`error - ${response.data}`);
    }
  }
  async function handleSubmit() {
    if (pageImage == null) return setIsSubmiting(false);
    const fileName = `pages/${pageImage?.name + v4()}`;
    const imageRef = ref(storage, fileName);
    // console.log(fileName, " is file name....");
    try {
      uploadBytes(imageRef, pageImage as any).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          postPage(url);
        });
      });
    } catch (error) {
      alert(error);
      console.log(" errorr here :(");
      setIsSubmiting(false);
    }
  }
  return (
    <>
      <main
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmiting(true);
          handleSubmit();
        }}
        style={{
          backgroundImage: "url(littl.png)",
        }}
        className=" bg-cover h-[100vh] w-full flex justify-center items-center relative "
      >
        <form className=" flex flex-col justify-center items-center  w-[50%] h-[70%] shadow-[0px_0px_10px_purple] rounded-lg ">
          <h2
            className=" text-4xl text-white text-center p-2"
            style={{ textShadow: "2px 2px 8px purple" }}
          >
            Getting start
          </h2>

          <label
            className=" text-white p-2 ml-2 "
            style={{ textShadow: "2px 2px 8px purple" }}
          >
            Your page name
          </label>
          <input
            required
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className=" flex flex-start w-2hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
            type="text"
          />
          <input
            required
            onChange={(e) => setPageImage(e.target.files?.[0])}
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
