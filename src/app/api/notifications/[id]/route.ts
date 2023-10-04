import { NextRequest } from "next/server";
import { getNotificationByUserId } from "../../../../../prisma/notifications";

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