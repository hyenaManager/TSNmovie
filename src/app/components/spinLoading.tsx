import { motion } from "framer-motion";
import Image from "next/image";

export default function SpinLoading() {
  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        className=" fixed h-full top-0 right-0  flex justify-center backdrop-blur-sm items-center z-20 w-full"
      >
        <motion.img
          src="/svgs/myicon.svg"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            rotate: 360,
            transition: { repeat: Infinity, duration: 2.3 },
          }}
          className=" h-[30px] w-[30px] m-2 "
        />
      </motion.div>
    </>
  );
}
