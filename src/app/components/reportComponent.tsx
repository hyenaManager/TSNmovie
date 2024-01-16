"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../loading";
type reportProps = {
  handleVisibillity: () => void;
  userId: string;
  postId: number;
};

export default function ReportSomething({
  handleVisibillity,
  userId,
  postId,
}: reportProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const report = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/reports", {
          postId: postId,
          userId: userId,
          title: title,
          message: message,
        });
        if (response.status === 200) {
          toast.success(response.data);
        }
      } catch (error: any) {
        toast.error(error.message as string);
      }
    },
    onSettled: () => {
      setIsSubmiting(false);
      handleVisibillity();
    },
  });
  return (
    <>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          setIsSubmiting(true);
          handleVisibillity();
        }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.4 } }}
        className="pageWarper fixed top-0 left-0 w-full h-full z-30 backdrop-blur-md flex flex-col justify-center items-center "
      >
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            report.mutate();
          }}
          key={"reportKey"}
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7 }}
          exit={{ y: "100vh" }}
          className=" relative reportSection flex justify-center border-2 border-fuchsia-500 rounded-md text-fuchsia-600 max-w-[80%] max-h-[80%] flex-col p-8  text-lg "
        >
          <h2 className=" text-2xl text-red-300">State your report</h2>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" outline-fuchsia-500 p-2 rounded-md mb-2 m-1 "
            placeholder="title your report"
          />
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" p-1 m-1 rounded-md xsm:w-[80%] sm:w-[300px] h-[120px] outline-fuchsia-500 "
            placeholder="enter your report here"
          />
          <div className=" buttons flex justify-between p-3 m-2 text-xl">
            <button
              type="submit"
              className=" text-white p-3 max-w-fit min-h-fit rounded-md bg-red-500 hover:bg-red-700"
            >
              Report
            </button>
            <button
              type="button"
              onClick={handleVisibillity}
              className=" text-white p-3 max-w-fit min-h-fit rounded-md bg-blue-400 hover:bg-blue-600"
            >
              cancel
            </button>
          </div>
          {isSubmiting ? <Loading /> : null}
        </motion.form>
      </motion.div>
    </>
  );
}
