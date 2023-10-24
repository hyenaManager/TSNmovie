import { NextRequest } from "next/server";
import { createNotification, deleteNotiByUserId, getAllNotifications, setWatchedTrue } from "../../../../prisma/notifications";

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
    const data:{
        message:string,
        type:string,
        holder:string,
        userEmail:string,
        userId:string,
        holderId:number,
    } = await request.json()
    try {
        const respone = await createNotification(data)
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

//set watched to true(nofication)
export async function PUT(request:NextRequest){
    try {
        const {notificationId} = await request.json()
        const data = await setWatchedTrue(notificationId)
        return new Response(JSON.stringify(data),{
            status:200
        }) 
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
} 

export async function DELETE(request:NextRequest){
    console.log("reach here all noti");
    try {
        const url = new URL(request.url)
        const userId = url.searchParams.get("userId") as string
        const respone = await deleteNotiByUserId(userId)
        return new Response(JSON.stringify(respone),{
            status:200
        })
        
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}