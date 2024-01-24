import axios from "axios";

export const createNoti = async (
  notiTo: string,
  notiType: string,
  user: any,
  clip: any
) => {
  const notiMakerUser = `${user.firstName} ${user.lastName}`;
  const response = await axios.post("http://localhost:3000/api/notifications", {
    message:
      notiType === "comment"
        ? `${notiMakerUser} comment on your clip`
        : `${notiMakerUser} replied you on a clip`,
    type: notiType,
    holder: "clip",
    userEmail: user.email, //user who replied(current user)
    userId: notiTo, //user who got replied
    holderId: clip?.clipId,
  });
  if (response.status === 200) {
    return "success";
  }
};
