import { faEye, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Like({ colorClass = "text-white" }: { colorClass: string }) {
  return (
    <div
      className=" m-2 flex items-center "
      style={{ textShadow: "2px 2px 8px black" }}
    >
      <span className=" text-white mr-1">{0}</span>
      <FontAwesomeIcon
        icon={faHeart}
        className={" text-2xl mr-1 cursor-auto " + colorClass}
        style={{ textShadow: "2px 2px 8px black" }}
      />
    </div>
  );
}

export function Eye({
  colorClass,
  count,
}: {
  colorClass: string;
  count: number;
}) {
  return (
    <div
      className=" m-2 flex items-center "
      style={{ textShadow: "2px 2px 8px black" }}
    >
      <span className=" text-white mr-1">{count}</span>
      <FontAwesomeIcon
        icon={faEye}
        className={" text-2xl mr-1 cursor-auto " + colorClass}
        style={{ textShadow: "2px 2px 8px black" }}
      />
    </div>
  );
}

export function Star({ colorClass = "text-white" }: { colorClass: string }) {
  return (
    <div
      className=" m-2 flex items-center "
      style={{ textShadow: "2px 2px 8px black" }}
    >
      <span className=" text-white mr-1">0</span>
      <FontAwesomeIcon
        icon={faStar}
        className={" text-2xl mr-1 cursor-auto " + colorClass}
        style={{ textShadow: "2px 2px 8px black" }}
      />
    </div>
  );
}
