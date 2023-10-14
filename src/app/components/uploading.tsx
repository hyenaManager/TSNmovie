"use client";
import { motion } from "framer-motion";
export function ProgressingUpload({ percent }: { percent: string }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" fixed top-10 left-10 flex justify-center items-center z-40 max-w-fit"
      >
        <h4 className=" text-sm text-green-500 font-mono p-2">
          uploading {parseInt(percent).toFixed(0)}
        </h4>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: [4, 3, 2, 1, 0, -1, -2, -3, -4, -3, -2, -1, 0, 1, 2, 3, 4],
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className=" bg-white h-[14px] w-[14px] m-2 rounded-full"
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: [-2, -1, 0, 1, 2],
          }}
          transition={{ delay: 0.5, repeat: Infinity, duration: 3 }}
          className=" bg-fuchsia-600 h-[14px] w-[14px] m-2 rounded-full"
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: [4, 3, 2, 1, 0, -1, -2, -3, -4, -3, -2, -1, 0, 1, 2, 3, 4],
          }}
          transition={{ delay: 0.7, repeat: Infinity, duration: 1 }}
          className=" bg-red-400 h-[14px] w-[14px] m-2 rounded-full"
        ></motion.div>
      </motion.div>
    </>
  );
}

export default function Uploading() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" fixed top-14 right-10 flex justify-center items-center z-20 max-w-fit"
      >
        <h4 className=" text-sm text-green-500 font-mono p-2">uploading </h4>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: [4, 3, 2, 1, 0, -1, -2, -3, -4, -3, -2, -1, 0, 1, 2, 3, 4],
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className=" bg-white h-[14px] w-[14px] m-2 rounded-full"
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: [-2, -1, 0, 1, 2],
          }}
          transition={{ delay: 0.5, repeat: Infinity, duration: 3 }}
          className=" bg-fuchsia-600 h-[14px] w-[14px] m-2 rounded-full"
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: [4, 3, 2, 1, 0, -1, -2, -3, -4, -3, -2, -1, 0, 1, 2, 3, 4],
          }}
          transition={{ delay: 0.7, repeat: Infinity, duration: 1 }}
          className=" bg-red-400 h-[14px] w-[14px] m-2 rounded-full"
        ></motion.div>
      </motion.div>
    </>
  );
}
