import prisma from "./client";

export async function getAllNotifications(){
    try {
        const data = await prisma.notifications.findMany()
        return data
    } catch (error) {
        throw error
    }
}

export async function getNotificationByUserId(userId:string){
    try {
        const data = await prisma.notifications.findMany({
            where:{
                userId:userId
            },
            include:{
                notiBy:true
            }
        })
        return data
    } catch (error) {
        throw error
    }
}

export async function createNotification(data:{type:string,message:string,holder:string,userId:string,userEmail:string,holderId:number}){
   
    
    try {
        await prisma.notifications.create({
            data:{
                type:data.type,
                message:data.message,
                holder:data.holder,
                userId:data.userId,
                userEmail:data.userEmail,
                holderId:data.holderId
            }
        })
        return "success"
    } catch (error) {
        console.log(error);
        throw error
    }
}

//turn the watch boolean true ,when the user watch the notification
export async function setWatchedTrue(notificationId:string){
    try {
        await prisma.notifications.update({
            where:{
                id:notificationId
            },
            data:{
                watched:true
            }
        })
        return "success"
    } catch (error) {
        return error
    }
}

export async function deleteNotiById(notificationId:string){
    try {
        await prisma.notifications.delete({
            where:{
                id:notificationId
            },
        })
    } catch (error) {
        return error
    }
}