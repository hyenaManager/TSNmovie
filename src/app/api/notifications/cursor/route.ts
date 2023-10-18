import { NextRequest } from "next/server";
import { getNotificationByCursor } from "../../../../../prisma/notifications";

export async function GET(request:NextRequest) {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") as string;
    const userId = url.searchParams.get("userId") as string;
    console.log("notifications ....");
    
    try {
        const notifications = await getNotificationByCursor(parseInt(cursor),userId)
        return new Response(JSON.stringify(notifications),{
            status:200,
            
        })
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
    
}