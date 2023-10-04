import { NextRequest } from "next/server";
import { createNotification, getAllNotifications } from "../../../../prisma/notifications";

export async function GET(request:Request){
    try {
        const data = await getAllNotifications()
        return new Response(JSON.stringify(data),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function POST(request:NextRequest){
    const {type,message,holder,userId,userEmail} = await request.json()
    try {
        const respone = await createNotification({message:message,type:type,holder:holder,userId:userId,userEmail:userEmail})
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}