import prisma from "./client";
type userType = {
    firstName: string;
    lastName: string ;
    email: string ;
    password: string;
    image: string ;
}

export async function getAllUsers(){
    const users = await prisma.user.findMany()
    return users
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