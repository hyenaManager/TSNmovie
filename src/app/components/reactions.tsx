import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Like() {
  return (
    <div
      className=" m-4 flex items-center"
      style={{ textShadow: "2px 2px 8px black" }}
    >
      <FontAwesomeIcon
        icon={faHeart}
        className=" text-white text-2xl mr-1 cursor-pointer "
        style={{ textShadow: "2px 2px 8px black" }}
      />
      <span className=" text-white">0</span>
    </div>
  );
}
