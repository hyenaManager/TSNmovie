import { motion } from "framer-motion";

export default function SpinLoading() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className=" absolute h-full top-0 right-0  flex justify-center backdrop-brightness-50 items-center z-20 w-full"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
          }}
          className=" bg-white h-[20px] w-[20px] m-2 rounded-full"
        ></motion.div>
      </motion.div>
    </>
  );
}
