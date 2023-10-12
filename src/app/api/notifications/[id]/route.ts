import { NextRequest } from "next/server";
import { deleteNotiById, getNotificationByUserId } from "../../../../../prisma/notifications";

export async function GET(request:NextRequest,{params}:{params:{id:string}}){
    try {
        const userId = params.id
        const data = await getNotificationByUserId(userId);
        return new Response(JSON.stringify(data),{
            status:200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    try {
        const notificationId = params.id
        await deleteNotiById(notificationId)
        return new Response(JSON.stringify("success"),{
            status:200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500,
            statusText:"there is error in deletion in noti"
        })
    }
}