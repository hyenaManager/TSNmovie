"use client";
import { storage } from "@/app/firebase";
import { faArrowCircleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import Uploading from "../uploading";
import { userProvider } from "@/app/context/userContext";
import { useRouter } from "next/navigation";

export default function CreateSeries() {
  const { userPage }: any = useContext(userProvider);
  const [genre, setGenre] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [movieDate, setMovieDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState<File | undefined>(undefined);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const hanldeUpload = () => {
    imageRef?.current?.click();
  };
  const queryClient = useQueryClient();
  const createSeries = async (imageUrl: string) => {
    await axios.post(`http://localhost:3000/api/series`, {
      name: title,
      releasedDate: movieDate,
      content: content,
      image: imageUrl,
      genre: genre,
      pageOwnerId: userPage.id,
    });
  };
  async function handleUploadImageToFirebase() {
    const fileName = `series/${uploadedImg?.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, uploadedImg as any);
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
          createSeries(url);
          //url is the actual path for a video that anyone can access in browser
        });
      }
    );
  }
  const mutation = useMutation({
    mutationFn: handleUploadImageToFirebase,
    onSettled: () => {
      setIsSubmiting(false);
      toast.success("series created successfully ");
      router.back();
      queryClient.invalidateQueries({ queryKey: ["page"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
      setIsSubmiting(false);
    },
  });

  if (isSubmiting) return <Uploading />;

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className=" pageWarper bg-black z-50 fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-brightness-50"
    >
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="xsm:flex-col sm:flex-row flex relative max-w-fit max-h-fit bg-black shadow-[0px_0px_20px_purple] "
      >
        <Image
          src={
            uploadedImg
              ? URL.createObjectURL(uploadedImg)
              : "/defaultProfile.jpeg"
          }
          alt="luffy"
          width={200}
          height={200}
          className=" w-3hundred bg-cover"
        />
        <FontAwesomeIcon
          icon={faEdit}
          onClick={hanldeUpload}
          className=" cursor-pointer w-[20px] h-[20px] p-2 rounded-full absolute bg-black top-1 left-1 text-white"
        />
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          className=" cursor-pointer w-[20px] h-[20px] p-2 rounded-full bg-black text-white absolute bottom-1 left-1"
          onClick={() => router.back()}
        />
        <input
          hidden
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={(e) => setUploadedImg(e.target.files?.[0])}
        />
        <section className=" flex flex-col bg-black justify-start">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 bg-black text-lg text-fuchsia-600 outline-none w-full border-b-2 border-fuchsia-600"
          />
          <textarea
            placeholder="Series overview"
            onChange={(e) => setContent(e.target.value)}
            className=" xsm:w-[310textareax] sm:w-5hundred h-[260px] text-fuchsia-600 m-2 outline-none border-2 rounded-lg "
          />

          <div className=" flex  justify-start flex-col">
            <div className=" flex justify-start w-[70%]  flex-col p-1 m-1">
              <label className=" text-lg text-white ">genre</label>
              <input
                value={genre}
                placeholder="eg(adventure,horror,...)"
                onChange={(e) => setGenre(e.target.value)}
                className="p-1 text-lg text-fuchsia-600 outline-none rounded-lg"
              />
            </div>
            <div className=" flex justify-start w-[70%] flex-col p-1 m-1">
              <label className=" text-lg text-white ">
                series release date
              </label>
              <input
                value={movieDate}
                placeholder="year only"
                onChange={(e) => setMovieDate(e.target.value)}
                className="p-1 text-lg text-fuchsia-600 outline-none rounded-lg"
              />
            </div>
          </div>
        </section>
        <button
          onClick={() => {
            mutation.mutate();
            setIsSubmiting(true);
          }}
          className=" p-2 rounded-md bg-green-400 hover:bg-green-600 text-white absolute bottom-1 right-1"
        >
          create
        </button>
      </motion.article>
    </motion.div>
  );
}
