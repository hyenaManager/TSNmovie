"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function Contact() {
  const [facebookLink, setFacebookLink] = useState(""); //
  const [whatsappLink, setWhatsappLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const params = useSearchParams();
  const createdPageId = params.get("pageId");
  async function createContact() {
    const response = await axios.post(
      "https://yokeplay.vercel.app/api/contact",
      {
        facebook: facebookLink,
        twitter: twitterLink,
        whatsapp: whatsappLink,
        telegram: telegramLink,
        pageId: createdPageId,
      }
    );
    if (response.status === 200) {
      toast.success("working.....");
    } else {
      setIsSubmiting(false);
      toast.error(response.statusText);
    }
  }
  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      toast.success("congratulation you just made a page ", {
        duration: 5000,
      });
      setIsFinish(true);
    },
  });
  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="fixed pageWarper z-50 top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center ">
      {mutation.isPending && (
        <h1 className=" text-4xl text-black text-center">
          Creating contact....
        </h1>
      )}
      {isFinish && (
        <div className=" border shadow-xl rounded-md flex flex-col justify-center items-center xsm:w-[95vw] sm:w-[40vw] bg-white xsm:h-full sm:h-[60vh]">
          <motion.img
            initial={{ opacity: 1, scale: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.7 }}
            className="fixed top-50 right-50 z-50"
            src={"/leonardo.gif"}
            alt="success"
          />
          <Link
            href={"/profile/page"}
            className=" p-2 bg-green-500 z-50 text-white rounded-md text-4xl font-mono cursor-pointer hover:bg-green-800"
          >
            Visit your page
          </Link>
        </div>
      )}
    </div>
  );
}
