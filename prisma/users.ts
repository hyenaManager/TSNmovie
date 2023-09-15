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

export async function getUser(email:string){
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
}

export async function createUser(newUser:userType){
    const users = await prisma.user.create({data:newUser})
    return users
}