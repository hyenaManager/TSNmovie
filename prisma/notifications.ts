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
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return data
    } catch (error) {
        throw error
    }
}

export async function getNotificationByCursor(cursor:number,userId:string) {
    const clipCount = await prisma.notifications.count({
        where:{
            userId:userId
        }
    });//counting all clips count for nextCursor whether fetching next page is available or not
    try {
        const notifications = await prisma.notifications.findMany({
            take:5,
            skip:cursor,
            include:{
                notiBy:true,
            },
            where:{
                userId:userId
            },
            // cursor:{
            //     id:cursor
            // },
            orderBy:{
                createdAt:"desc"
            }
        });
      
        const nextCursor = cursor+5 <= clipCount-1 ? cursor+5:null //return nextcursor for fetchNextPage's cursor
        return {notifications,nextCursor}
    } catch (error) {
        return error
    }
}

export async function createNotification(data:{type:string,message:string,holder:string,userId:string,userEmail:string,holderId:number}){
   const notiExistCount = await prisma.notifications.findUnique({
    where:{
        id:data.holderId+data.userEmail
    }
   })
    try {
        //preventing duplicate notification for each noti
        if(notiExistCount){
            const currentTime = new Date();
            await prisma.notifications.update({
                where:{
                    id:data.holderId+data.userEmail 
                },
                data:{
                    createdAt:currentTime
                }
            })
            return "success"
        }
        await prisma.notifications.create({
            data:{
                id:data.holderId+data.userEmail,
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

export async function deleteNotiByUserId(userId:string){
    console.log("reach here all noti");
    try {
        await prisma.notifications.deleteMany({
            where:{
                userId:userId
            },
        })
        return "success"
    } catch (error) {
        return error
    }
}