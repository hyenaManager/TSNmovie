import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Fragment, useContext, useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { userProvider } from "../context/userContext";
import DeleteComment from "./deleteComment";

type repliedCommentType = {
  user: { lastName: string; image: string; id: string; firstName: string };
  userImage: string;
  text: string;
  id: string;
};

type commentData = {
  comments: { user: any; text: string; userImage: string };
  nextCursor: number;
};

export default function ChildrenComment({ parentId }: { parentId: string }) {
  const [hideReplies, setHideReplies] = useState(true);
  const { user }: any = useContext(userProvider);
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
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  console.log("comment page  is ", data?.pages);

  return (
    <>
      <ul className="w-full relative overflow-auto  flex flex-col justify-start p-1">
        {!hideReplies &&
          data?.pages.map((page: any, index: number) => (
            <React.Fragment key={index}>
              {page.comments.map((repliedComment: repliedCommentType) => (
                <li
                  className=" w-full max-h-fit flex justify-start mb-2"
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
                      {repliedComment?.user?.firstName +
                        " " +
                        repliedComment?.user?.lastName}
                    </small>
                    <p className="w-full max-h-fit bg-fuchsia-500 text-white text-sm rounded-md p-1">
                      {repliedComment.text}
                    </p>
                    {repliedComment?.user.id === user.id && (
                      <DeleteComment commentId={repliedComment?.id} />
                    )}
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
        {/* toggling view or hide replies */}
        {data?.pages[0].comments.length !== 0 && (
          <button
            className=" text-sm text-slate-900 font-bold  text-end"
            onClick={() => setHideReplies(!hideReplies)}
          >
            {hideReplies ? "view reply" : "hide reply"}
          </button>
        )}
      </ul>
    </>
  );
}
