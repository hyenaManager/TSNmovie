import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PendingComment({
  variables,
  image,
  comment,
}: {
  variables: any;
  image: string;
  comment: string;
}) {
  return (
    <li className=" w-full z-50 max-h-fit flex justify-start mb-2">
      <img
        src={image}
        alt="image"
        className=" w-[40px] h-[40px] bg-fuchsia-500 rounded-full"
      />
      <div
        className="w-full relative  max-h-fit flex flex-col justify-start ml-2"
        style={{ height: "fit-content" }}
      >
        <small className=" text-sm text-fuchsia-700 ">pending</small>
        <p className="w-full max-h-fit bg-fuchsia-500 text-white text-sm rounded-xl p-2">
          {comment}
        </p>
        {/* option... */}
        <div className="flex relative justify-start items-center">
          <button className="flex justify-start m-1 ">
            <FontAwesomeIcon
              icon={faReply}
              className=" w-[20px] h-[20px] text-fuchsia-500"
            />
            <i className="text-fuchsia-500 text-sm ">Reply</i>
          </button>
          {/* {comment.user.id === user.id && (
                    <DeleteComment commentId={comment.id} />
                  )} */}
        </div>
        {/* <ChildrenComment
                  parentId={comment.id}
                  handleReplying={handleReplying}
                /> */}
      </div>
    </li>
  );
}
