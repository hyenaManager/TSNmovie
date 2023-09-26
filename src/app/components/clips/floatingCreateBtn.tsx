import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function CreateButton({
  isCreating,
}: {
  isCreating: () => void;
}) {
  return (
    <FontAwesomeIcon
      onClick={isCreating}
      icon={faPlus}
      className="p-3 cursor-pointer flex justify-center fixed xsm:bottom-0 xsm:right-50 z-20 sm:bottom-9 sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] bg-green-400 xsm:rounded-lg sm:rounded-full text-white items-center"
    />
  );
}

export function CreateClipButton({ isCreating }: { isCreating: () => void }) {
  return (
    <button
      onClick={isCreating}
      title="create clip"
      className="p-2 flex justify-center absolute xsm:bottom-0 xsm:right-50 z-20 sm:bottom-9 sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[70px] sm:h-[40px] bg-fuchsia-400 xsm:rounded-lg sm:rounded-xl text-white items-center"
    >
      <Image src={"/svgs/clips.svg"} width={40} height={40} alt="stack" />
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}
