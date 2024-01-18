import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { userProvider } from "../app/context/userContext";
import DeleteComment from "./deleteComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

type repliedCommentType = {
  user: { lastName: string; image: string; id: string; firstName: string };
  userImage: string;
  text: string;
  id: string;
  repliedTo: { firstName: string; lastName: string };
};

type commentData = {
  comments: { user: any; text: string; userImage: string };
  nextCursor: number;
};

export default function ChildrenComment({
  parentId,
  handleReplying,
}: {
  parentId: string;
  handleReplying: (
    parentId: string,
    author: any,
    replyingToUserId: any
  ) => void;
}) {
  const { user }: any = useContext(userProvider);
  const [hideReplies, setHideReplies] = useState(true);
  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["childComment", parentId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get(
        `https://yokeplay.vercel.app/api/comments/cursor?parentId=${parentId}&cursor=${pageParam}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error(response.statusText);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  console.log("comment page  is ", data?.pages);

  return (
    <>
      {!hideReplies && (
        <ul className="w-full overflow-auto  flex flex-col justify-start mb-4">
          {data?.pages.map((page: any, index: number) => (
            <React.Fragment key={index}>
              {page.comments.map((repliedComment: repliedCommentType) => (
                <li
                  className=" w-full max-h-fit flex justify-start "
                  key={repliedComment.id}
                >
                  <Image
                    src={repliedComment?.userImage || "/defaultProfile.jpeg"}
                    alt="image"
                    width={40}
                    height={40}
                    className=" w-[40px] h-[40px] bg-fuchsia-500 object-cover rounded-full  p-1"
                  />
                  <div
                    className="w-full  max-h-fit flex flex-col justify-start ml-2"
                    style={{ height: "fit-content" }}
                  >
                    <small className=" text-sm text-fuchsia-700 ">
                      {`${repliedComment?.user?.firstName} ${repliedComment?.user?.lastName}>${repliedComment?.repliedTo?.firstName} ${repliedComment?.repliedTo?.lastName}`}
                    </small>
                    <p className="w-full max-h-fit bg-fuchsia-500 text-white text-sm rounded-md p-1">
                      {repliedComment.text}
                    </p>
                    {/* reply and delete mode */}
                    <div className="flex justify-start items-center">
                      {repliedComment?.user.id === user.id && (
                        <DeleteComment commentId={repliedComment?.id} />
                      )}
                      <button
                        onClick={() =>
                          handleReplying(parentId, user, repliedComment?.user)
                        }
                        className="flex justify-start m-1 "
                      >
                        <FontAwesomeIcon
                          icon={faReply}
                          className=" w-[20px] h-[20px] text-fuchsia-500"
                        />
                        <i className="text-fuchsia-500 text-sm ">Reply</i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))}
          {!hideReplies && hasNextPage && (
            <button
              className=" text-sm text-slate-600 italic text-start"
              onClick={() => fetchNextPage()}
            >
              ...see more comments
            </button>
          )}
          {/* toggling view or hide replies  */}
        </ul>
      )}
      {data?.pages[0].comments.length !== 0 && (
        <button
          className=" text-sm text-slate-900 font-bold  max-w-fit absolute bottom-0 right-0"
          onClick={() => setHideReplies(!hideReplies)}
        >
          {hideReplies ? "view reply" : "hide reply"}
        </button>
      )}
    </>
  );
}
