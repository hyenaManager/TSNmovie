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
import { userProvider } from "../../app/context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { CommentSkeleton } from "@/app/skeletons/commentSkeleton";
import ChildrenComment from "./childComment";
import DeleteComment from "../deleteComment";
import PendingComment from "../pendingComment";
import CommentTextBox from "./commentTextBox";
interface CommentParent {
  parentId: string;
  replyingToUser: {
    id: string;
    lastName: string;
    firstName: string;
    image: string;
  };
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
  clip: {
    clipTitle: string;
    clipId: number;
    adminId: string;
  } | null;
}) {
  const { user }: any = useContext(userProvider);

  const [commentText, setCommentText] = useState("");
  const [commentParent, setCommentParent] = useState<CommentParent | null>(
    null
  ); //get a comment parentData for replying
  /// is creating comment pending
  const [isCommentPending, setIsCommentPending] = useState(false);
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

  const handleReplying = (
    parentId: string, //parent comment id
    commentUser: {
      id: string;
      lastName: string;
      firstName: string;
      image: string;
    }, //user who comment (current user)
    replyingToUser: any
  ) => {
    setCommentParent({ parentId, commentUser, replyingToUser });
  };
  //create noti for bot reply and comment mode
  const createNoti = async (notiTo: string, notiType: string) => {
    const notiMakerUser = `${user.firstName} ${user.lastName}`;
    const response = await axios.post(
      "https://yokeplay.vercel.app/api/notifications",
      {
        message:
          notiType === "comment"
            ? `${notiMakerUser} comment on your clip`
            : `${notiMakerUser} replied you on a clip`,
        type: notiType,
        holder: "clip",
        userEmail: user.email, //user who replied(current user)
        userId: notiTo, //user who got replied
        holderId: clip?.clipId,
      }
    );
    if (response.status === 200) {
      return "success";
    }
  };

  //comment mode
  const createComment = async () => {
    createNoti(clip?.adminId as string, "comment");
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
      queryClient.invalidateQueries({ queryKey: ["comments", clip?.clipId] });
      setCommentParent(null);
      commentTextRef.current = null;
      queryClient.invalidateQueries({ queryKey: ["childComment"] });
      return toast.success("commented");
    } else {
      toast.error(response.statusText);
    }
  };
  //reply mode
  const createReplyComment = async () => {
    createNoti(commentParent?.replyingToUser.id as string, "reply");
    const response = await axios.post(
      `https://yokeplay.vercel.app/api/comments`,
      {
        text: commentText,
        userId: user.id, //user(current user) who replied parent comment
        parentId: commentParent?.parentId, //id to connect with parent comment
        userImage: user.image,
        mode: "reply",
        replyingTo: commentParent?.replyingToUser.id,
      }
    );
    if (response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["comments", clip?.clipId] });
      commentTextRef.current = null;
      setCommentParent(null);
      setCommentText("");
      return toast.success("commented");
    } else {
      toast.error(response.statusText);
    }
  };

  const { mutate, isPending, variables } = useMutation({
    mutationFn: async () => {
      if (commentParent) {
        createReplyComment(); //for replying
      } else {
        createComment(); //for creating new comment
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", clip?.clipId] });
      queryClient.invalidateQueries({ queryKey: ["childComment"] });
    },
    onSettled: () => setIsCommentPending(false),
  });
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
  console.log("is mutation pending: ", isPending);

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
        <ul className="xsm:w-[90vw] h-[82%] overflow-auto  sm:w-[80vw] md:w-[70vw]   flex flex-col justify-start p-3">
          {!data &&
            [1, 2, 3, 4].map((number) => <CommentSkeleton key={number} />)}
          {data && (
            <h3 className=" font-mono text-fuchsia-600 text-lg">
              {totalCommentCalculator()} comments
            </h3>
          )}
          {data?.map((comment: any) => (
            <CommentTextBox handleReplying={handleReplying} comment={comment} />
          ))}
          {isPending && (
            <PendingComment
              image={user?.image}
              variables={variables}
              comment={commentText}
            />
          )}
        </ul>
        {/* comment submit section */}
        <div className=" flex justify-start p-2 xsm:w-[100%] sm:w-[50%] bg-fuchsia-400 rounded-xl items-center border absolute bottom-2 right-50 ">
          {commentParent !== null && (
            <div className=" flex justify-center items-center text-blue text-sm">
              <i className=" text-center">{`replying to @${
                commentParent?.replyingToUser.firstName +
                " " +
                commentParent?.replyingToUser.lastName
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

          <button>
            <FontAwesomeIcon
              onClick={() => {
                mutate();
                setIsCommentPending(true);
              }}
              icon={faArrowUp}
              className=" w-[30px] h-[30px] text-white rounded-full p-1 bg-fuchsia-600"
            />
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
