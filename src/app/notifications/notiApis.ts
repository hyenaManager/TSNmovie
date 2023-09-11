import axios from "axios"


export const getNotification = async ()=> {
    const response = await axios.get("http://localhost:4000/notifications")
    return response.data 
}