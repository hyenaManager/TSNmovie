import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateButton({
  isCreating,
}: {
  isCreating: () => void;
}) {
  return (
    <FontAwesomeIcon
      onClick={isCreating}
      icon={faPlus}
      className="p-3 cursor-pointer text-2xl fixed bottom-9 right-10 w-50 h-50 bg-green-400 rounded-full text-white items-center"
    />
  );
}
