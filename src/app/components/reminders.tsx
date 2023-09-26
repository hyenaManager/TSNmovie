import { motion } from "framer-motion";

export default function ClipVideoLengthReminder({
  handleVisibility,
}: {
  handleVisibility: () => void;
}) {
  return (
    <motion.div className="absolute bottom-1 left-2 flex justify-center p-2 bg-black items-center">
      <small className="mr-1 text-red-400 text-lg text-center">
        Your video is too long
      </small>
      <button
        onClick={handleVisibility}
        className=" text-white rounded-sm p-1 text-sm"
      >
        X
      </button>
    </motion.div>
  );
}
