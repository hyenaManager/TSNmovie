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
                Page:true
            }
        })
        return user
    } catch (error) {
        return error
    }
}

export async function createUser(newUser:userType){
    const users = await prisma.user.create({data:newUser})
    return users
}