import { motion } from "framer-motion";

export default function Loading() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" absolute h-full top-0 right-0  flex justify-center items-center z-20 w-full"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            scale: [1.5, 1.4, 1.3, 1.1, 0.9, 0.8, 0.6, 0.9, 1.2, 1.3, 1.4, 1.5],
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className=" bg-white h-[30px] w-[30px] m-2 rounded-full"
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            scale: [1.5, 1.4, 1.3, 1.1, 0.9, 0.8, 0.6, 0.9, 1.2, 1.3, 1.4, 1.5],
          }}
          transition={{ delay: 0.5, repeat: Infinity, duration: 1 }}
          className=" bg-fuchsia-600 h-[30px] w-[30px] m-2 rounded-full"
        ></motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            scale: [1.5, 1.4, 1.3, 1.1, 0.9, 0.8, 0.6, 0.9, 1.2, 1.3, 1.4, 1.5],
          }}
          transition={{ delay: 0.7, repeat: Infinity, duration: 1 }}
          className=" bg-red-400 h-[30px] w-[30px] m-2 rounded-full"
        ></motion.div>
      </motion.div>
    </>
  );
}
