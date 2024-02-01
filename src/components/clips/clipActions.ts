import axios from "axios";
import { v4 } from "uuid";

export const createNoti = async (
  notiTo: string,
  notiType: string,
  user: any,
  clip: any
) => {
  const notiMakerUser = `${user.firstName} ${user.lastName}`;
  const response = await axios.post(
    "https://yokeplay.vercel.app/api/notifications",
    {id:v4(),
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
