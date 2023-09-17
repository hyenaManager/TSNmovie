import { createUser, getAllUsers } from "../../../../prisma/users";

export async function GET(request:Request) {
    try {
        const response = await getAllUsers()
        // console.log("this is respone...",response);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        console.log(error,"errrrrrrrorrrr.......")
        return error
    }
}

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const response = await createUser(body)
        // console.log("this is creating User...",body);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        const data = await request.json()
        // console.log("body: 000000::  ",JSON.stringify(data));
        
        console.log(error,"error in user creation.......")
        return new Response(error as string,{
            status:500
        })
    }
}
