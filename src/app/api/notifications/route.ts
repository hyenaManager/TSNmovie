import { NextRequest } from "next/server";
import { createCommentNoti, createLikeNoti, deleteNotiByUserId, getAllNotifications, setWatchedTrue, updateNoti } from "../../../../prisma/notifications";
import prisma from "../../../../prisma/client";

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
    const data:any = await request.json()
    ///check if the noti already exist by user
    const notiExistCount = await prisma.notifications.findUnique({
        where:{
            // if data.id exist used it to search else use data.holderId+data.userEmail
            id:data.id?data.id:(data.holderId+data.userEmail)
        }
    })
    //if noti type is 'like' create new noti for like but ( if like already exist update just the time )
    //if noti type is 'comment' create new noti for comment noti (with generated id)
    try {  
        if(notiExistCount){
            const respone = await updateNoti(data.id?data.id:data.holderId+data.userEmail)
        return new Response(JSON.stringify(respone),{
            status:200
        })
        }
        if(data.type==="like"){
            const respone = await createLikeNoti(data)
        return new Response(JSON.stringify(respone),{
            status:200
        })
        }
        if(data.type!="like"){
            const respone = await createCommentNoti(data)
        return new Response(JSON.stringify(respone),{
            status:200
        })
        }
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