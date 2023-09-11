import axios from "axios"
import { getCurrentTime } from "../myFuntions"

export const getFeedVideo = async ()=> {
    const response = await axios.get("http://localhost:4000/clips")
    return response.data 
}
export const addLike = async (postId:number,newLikeGiverId:number,likes:number[])=>{
    const response = await axios.patch(`http://localhost:4000/clips/${postId}`,{
        like:[...likes,newLikeGiverId]
    })
}
export const removeLike = async (postId:number,likeRemoverId:number,likes:number[])=>{
    const response = await axios.patch(`http://localhost:4000/clips/${postId}`,{
        like:likes.filter((like)=>like !== likeRemoverId)
    })
}

export const newNotification = async (
    author:string,
    postType:string,
    notificationType:string,
    postId:number,
    user:string
    )=> {
        const notiResponse = await axios.post(`http://localhost:4000/notifications`,{
            author: author,
            postType:postType,
            postId:postId,
            notificationType: notificationType,
            user: user,
            message:`${author} ${notificationType} your ${postType}`,
            time: getCurrentTime(),
            watched: false
    })
}