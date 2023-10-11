import {
  faArrowUp,
  faComment,
  faCommentDots,
  faReply,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { userProvider } from "../context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { CommentSkeleton } from "../skeletons/commentSkeleton";
import Image from "next/image";
import ChildrenComment from "./childComment";
import DeleteComment from "./deleteComment";
interface CommentParent {
  parentId: string;
  commentUser: {
    id: string;
    lastName: string;
    firstName: string;
    image: string;
  };
}
export default function ClipComment({
  hideComment,
  clip,
}: {
  hideComment: () => void;
  clip: { clipTitle: string; clipId: number } | null;
}) {
  const { user }: any = useContext(userProvider);
  const [commentText, setCommentText] = useState("");
  const [commentParent, setCommentParent] = useState<CommentParent | null>(
    null
  ); //get a comment parentData for replying
  const commentTextRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ["comments", clip?.clipId],
    queryFn: async () => {
      const response = await axios.get(
        `https://yokeplay.vercel.app/api/comments/${clip?.clipId}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error(response.statusText);
      }
    },
  });

  const handleComment = () => {
    mutation.mutate();
  };
  const handleReplying = (
    parentId: string,
    commentUser: {
      id: string;
      lastName: string;
      firstName: string;
      image: string;
    }
  ) => {
    setCommentParent({ parentId, commentUser });
  };
  //comment mode
  const createComment = async () => {
    const response = await axios.post(
      `https://yokeplay.vercel.app/api/comments`,
      {
        text: commentText,
        userId: user?.id,
        clipId: clip?.clipId,
        mode: "comment",
      }
    );
    if (response.status === 200) {
      queryClient.invalidateQueries(["comments", clip?.clipId]);
      setCommentParent(null);
      setCommentText("");
      commentTextRef.current = null;
      return toast.success("commented");
    } else {
      toast.error(response.statusText);
    }
  };
  //reply mode
  const createReplyComment = async () => {
    const response = await axios.post(
      `https://yokeplay.vercel.app/api/comments`,
      {
        text: commentText,
        userId: user.id,
        parentId: commentParent?.parentId,
        userImage: user.image,
        mode: "reply",
      }
    );
    if (response.status === 200) {
      queryClient.invalidateQueries(["comments", clip?.clipId]);
      setCommentParent(null);
      setCommentText("");
      commentTextRef.current = null;
      return toast.success("commented");
    } else {
      toast.error(response.statusText);
    }
  };

  const mutation = useMutation(
    async () => {
      if (commentParent) {
        createReplyComment(); //for replying
      } else {
        createComment(); //for creating new comment
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", clip?.clipId]);
        queryClient.invalidateQueries(["childComment"]);
      },
    }
  );
  const totalCommentCalculator = () => {
    let totalComments = 0;
    data?.forEach((comment: any) => {
      totalComments++;
      const { childComments } = comment;
      for (let index = 0; index <= childComments.length - 1; index++) {
        totalComments++;
      }
    });
    return totalComments;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "100vh" }}
      className=" fixed z-50 top-0 left-0 w-full h-full flex flex-col justify-end"
    >
      <motion.section
        initial={{ opacity: 1, y: "100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ stiffness: 100 }}
        className=" flex justify-center  relative rounded-t-lg h-[88vh] overflow-auto w-[100vw] bg-white"
      >
        <ul className="xsm:w-[90vw] h-[82%] overflow-auto  sm:w-[50vw] flex flex-col justify-start p-3">
          {!data &&
            [1, 2, 3, 4].map((number) => <CommentSkeleton key={number} />)}
          {data && (
            <h3 className=" font-mono text-fuchsia-600 text-lg">
              {totalCommentCalculator()} comments
            </h3>
          )}
          {data?.map((comment: any) => (
            <li
              className=" w-full max-h-fit flex justify-start mb-2"
              key={comment.id}
            >
              <img
                src={comment?.user.image}
                alt="image"
                className=" w-[40px] h-[40px] bg-fuchsia-500 rounded-full"
              />
              <div
                className="w-full  max-h-fit flex flex-col justify-start ml-2"
                style={{ height: "fit-content" }}
              >
                <small className=" text-sm text-fuchsia-700 ">
                  {comment?.user?.firstName + " " + comment?.user?.lastName}
                </small>
                <p className="w-full max-h-fit bg-fuchsia-500 text-white text-sm rounded-xl p-2">
                  {comment.text}
                </p>
                {/* option... */}
                <div className="flex justify-start items-center">
                  <button
                    onClick={() => handleReplying(comment.id, comment.user)}
                    className="flex justify-start m-1 "
                  >
                    <FontAwesomeIcon
                      icon={faReply}
                      className=" w-[20px] h-[20px] text-fuchsia-500"
                    />
                    <i className="text-fuchsia-500 text-sm ">Reply</i>
                  </button>
                  {comment.user.id === user.id && (
                    <DeleteComment commentId={comment.id} />
                  )}
                </div>
                <ul className=" flex-col w-full">
                  <ChildrenComment parentId={comment.id} />
                </ul>
              </div>
            </li>
          ))}
        </ul>
        {/* comment section */}
        <div className=" flex justify-start p-2 xsm:w-[100%] sm:w-[50%] bg-fuchsia-400 rounded-xl items-center border absolute bottom-2 right-50 ">
          {commentParent !== null && (
            <div className=" flex justify-center items-center text-blue text-sm">
              <i className=" text-center">{`replying to @${
                commentParent?.commentUser.firstName +
                " " +
                commentParent?.commentUser.lastName
              }`}</i>
              <button
                onClick={() => setCommentParent(null)}
                className="text-white border rounded-md p-1 hover:bg-red-400"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          )}
          <textarea
            required
            // value={clipName}
            ref={commentTextRef}
            value={commentText}
            autoFocus
            placeholder="comment"
            onChange={(e) => {
              setCommentText(e.target.value);
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            style={{
              resize: "none",
              height: "auto",
            }}
            className=" border w-full rounded-lg flex overflow-y-hidden flex-start ml-2 mr-2 text-lg p-2 text-fuchsia-800 font-bold outline-none bg-none"
          />

          <button
            disabled={mutation.isLoading}
            className="flex justify-center items-center"
            onClick={handleComment}
          >
            {!mutation.isLoading ? (
              <FontAwesomeIcon
                icon={faArrowUp}
                className=" w-[30px] h-[30px] text-white rounded-full p-1 bg-fuchsia-600"
              />
            ) : (
              "..."
            )}
          </button>
        </div>
        <button>
          <FontAwesomeIcon
            icon={faXmark}
            className=" w-[30px] h-[30px] text-slate-500 absolute top-2 left-2"
            onClick={() => hideComment()}
          />
        </button>
      </motion.section>
    </motion.div>
  );
}
