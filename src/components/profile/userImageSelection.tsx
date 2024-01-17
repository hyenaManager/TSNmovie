import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { myUserProfiles } from "../../../public/mySvg";
import { useEffect, useState } from "react";

export default function UserImageSelection({
  setUserImage,
}: {
  setUserImage: (image: string) => void;
}) {
  const [profiles, setProfiles] = useState(myUserProfiles.slice(0, 4));
  const [isNext, setIsNext] = useState(true); //for button next slide or back slide
  useEffect(() => {
    if (isNext) {
      setProfiles(myUserProfiles.slice(0, 4));
    } else {
      setProfiles(myUserProfiles.slice(4, 7));
    }
  }, [isNext]);
  return (
    <>
      <button
        className="text-blue-500 text-lg flex justify-center items-center w-full"
        onClick={(e) => {
          e.stopPropagation();
          setIsNext(!isNext);
        }}
        type="button"
      >
        {isNext ? (
          <>
            <h4>Next</h4>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-[20px] h-[20px]"
            />
          </>
        ) : (
          <>
            <h4>Previous</h4>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-[20px] h-[20px]"
            />
          </>
        )}
      </button>
      <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto p-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border border-zinc-200 rounded-full overflow-hidden dark:border-zinc-800"
          >
            <input
              className="sr-only"
              id="image-1"
              name="profileImage"
              type="radio"
            />
            <label htmlFor="image-1">
              <img
                alt="Profile Image 1"
                onClick={() => setUserImage(profile.source)}
                className="object-cover w-full h-full cursor-pointer"
                height="200"
                src={profile.source}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="100"
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
