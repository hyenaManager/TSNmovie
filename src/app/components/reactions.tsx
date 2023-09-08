import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Like() {
  return (
    <div className=" m-4 flex justify-center items-center">
      <FontAwesomeIcon
        icon={faHeart}
        className=" text-white text-2xl p-1 cursor-pointer "
      />
      <span className=" text-white">0</span>
    </div>
  );
}
