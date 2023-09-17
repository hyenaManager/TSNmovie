import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateButton({
  isCreating,
}: {
  isCreating: () => void;
}) {
  return (
    <button className="p-3 flex justify-center fixed xsm:bottom-0 z-20 sm:bottom-9  xsm:right-[50%] sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[50px] sm:h-[50px] bg-green-400 xsm:rounded-lg sm:rounded-full text-white items-center">
      <FontAwesomeIcon
        onClick={isCreating}
        icon={faPlus}
        className="w-[30px] h-[30px]"
      />
    </button>
  );
}
