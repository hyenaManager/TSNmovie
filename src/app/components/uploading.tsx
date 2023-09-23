import { motion } from "framer-motion";
// export default function Uploading() {
//   return (
//     <div className=" fixed top-14 max-w-fit right-10 z-20 flex items-center">
//       <h4 className=" text-sm text-green-500 font-mono p-2">uploading</h4>
//       <motion.div
//         initial={{ opacity: 1 }}
//         animate={{ rotateX: 90 }}
//         transition={{ repeat: Infinity, duration: 5 }}
//         className=" h-[50px] w-[50px] rounded-full border flex justify-center items-center"
//       >
//         <span className="m-1 w-[10px] bg-fuchsia-400 rounded-full h-[10px]  "></span>
//         <span className="m-1 w-[10px] bg-white h-[10px] rounded-full "></span>
//       </motion.div>
//     </div>
//   );
// }

export default function Uploading() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" fixed top-14 right-10 flex justify-center items-center z-20 max-w-fit"
      >
        <h4 className=" text-sm text-green-500 font-mono p-2">uploading</h4>
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
