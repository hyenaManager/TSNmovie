import prisma from "./client";
type userType = {
    firstName: string;
    lastName: string ;
    email: string  ;
    password: string|null;
    image: string ;
}

export async function getAllUsers(){
    try {
        const users = await prisma.user.findMany()
    
        
    return users
    } catch (error) {

        return error
    }
}

export async function getUserByMail(email:string){
    try {
        const user = await prisma.user.findUnique({
            where:{
                email:email
            },
            include:{
                Page:true,
                following:true,
                suspended:true
            }
        })
        return user
    } catch (e:any) {
       throw e
      }
}

export async function createUser(newUser:userType){
    try {
        const users = await prisma.user.create({data:newUser})
    return users    
    } catch (error) {
        throw error
    }
}

export async function changeUserImage(image:string,email:string){
    try {
        const respone = await prisma.user.update({
            where:{
                email:email
            },
            data:{
                image:image
            }
        })
        return respone
    } catch (error) {
        throw error
    }
}

export async function changeUserName(firstName:string,lastName:string,email:string){
    try {
        const respone = await prisma.user.update({
            where:{
                email:email
            },
            data:{
                firstName:firstName,
                lastName:lastName,
            }
        })
        return respone
    } catch (error) {
        return error
    }
}

export async function changeUserRoleToAdmin(userId:string){
    try {
         const user = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                role:"ADMIN"
            }
        })
        return user
    } catch (error) {
        return error
    }
}

export async function deleteUserByEmail(userEmail:string){
    try {
        await prisma.user.delete({
            where:{
                email:userEmail
            }
        })
        return "deleted successfully"
    } catch (error) {
        return error
    }
}

export async function suspendUserByEmail(userEmail:string){
    //check if the user is suspended before
    const currentTime = new Date()
    const suspendExpireTime = new Date()
    const suspendedBefore = await prisma.suspended.findUnique({
        where:{
            suspendedUserEmail:userEmail
        }
    })
    if (suspendedBefore){
        await prisma.suspended.delete({
            where:{
                suspendedUserEmail:userEmail
            }
        })
    }
    suspendExpireTime.setMinutes(suspendExpireTime.getMinutes()+1)
    const message = `you are suspended for a minute`
    try {
        await prisma.suspended.create({
            data:{
                suspendedUserEmail:userEmail,
                startDate:currentTime,
                endDate:suspendExpireTime,
                message:message
            }
        })
        return "suspened successfully"
    } catch (error) {
        return error
    }
}

export async function updateUserData(data:userType){
    try {
        await prisma.user.update({
            where:{
                email:data.email
            },
            data:data
        })
        return "success"
    } catch (error) {
        return error
    }
}