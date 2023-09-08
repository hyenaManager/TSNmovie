import axios from "axios"

export const getFeedVideo = async ()=> {
    const response = await axios.get("http://localhost:4000/clips")
    return response.data 
}
export const addLike = async (postId:number,newLikeGiverId:number,likes:number[])=>{
    const response = await axios.patch(`http://localhost:4000/clips/${postId}`,{
        like:[...likes,newLikeGiverId]
    })
    const notiResponse = await axios.post(`http://localhost:4000/notifications`,{
        status:"someone like your clips",
        notificationType:"clips",
        user:newLikeGiverId,
        time:"5:30 pm"
    })
}
export const removeLike = async (postId:number,likeRemoverId:number,likes:number[])=>{
    const response = await axios.patch(`http://localhost:4000/clips/${postId}`,{
        like:likes.filter((like)=>like !== likeRemoverId)
    })
}
export const getNotification = async ()=> {
    const response = await axios.get("http://localhost:4000/notifications")
    return response.data 
}