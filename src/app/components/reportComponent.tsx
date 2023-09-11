"use client";
import { motion } from "framer-motion";
type reportProps = {
  handleVisibillity: () => void;
};

export default function ReportSomething({ handleVisibillity }: reportProps) {
  return (
    <>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          handleVisibillity();
        }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.4 } }}
        className="pageWarper fixed top-0 left-0 w-full h-full z-30 backdrop-blur-md flex flex-col justify-center items-center "
      >
        <motion.section
          key={"reportKey"}
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7 }}
          exit={{ y: "100vh" }}
          className=" reportSection flex justify-center border-2 border-fuchsia-500 rounded-md text-fuchsia-600 max-w-[80%] max-h-[80%] flex-col p-8  text-lg "
        >
          <h2 className=" text-2xl text-red-300">State your report</h2>
          <input
            type="text"
            className=" outline-fuchsia-500 p-2 rounded-md mb-2 m-1 "
            placeholder="title your report"
          />
          <textarea
            className=" p-1 m-1 rounded-md w-[300px] h-[120px] outline-fuchsia-500 "
            placeholder="enter your report here"
          />
          <div className=" buttons flex justify-between p-3 m-2 text-xl">
            <button className=" text-white p-3 max-w-fit min-h-fit rounded-md bg-red-500 hover:bg-red-700">
              Report
            </button>
            <button
              onClick={handleVisibillity}
              className=" text-white p-3 max-w-fit min-h-fit rounded-md bg-blue-400 hover:bg-blue-600"
            >
              cancel
            </button>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
}
