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

//create like noti
export async function createLikeNoti(data:{id:string,type:string,message:string,holder:string,userId:string,userEmail:string,holderId:number}){
   //this condtion is checked for giving like , that if the user already liked the post ,if true just update the time
   //but for comment this condition check is not necessary

   try {
    const newNoti = await prisma.notifications.create({
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

//create comment noti
export async function createCommentNoti(data:{id:string,type:string,message:string,holder:string,userId:string,userEmail:string,holderId:number}){
 
     try {      
        const newNoti = await prisma.notifications.create({
             data:{
                id:data.id,
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

 //update noti
export async function updateNoti(notiId:string){
    console.log("it reach here noti update and id is :",notiId);
    
    const currentTime = new Date();
    try {
        await prisma.notifications.update({
            where:{
                id:notiId
            },
            data:{
                createdAt:currentTime,
                watched:false,
            }
        })
    } catch (error) {
        
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