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
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function POST(request:Request) {
    const body = await request.json()
    try {
        const response = await createUser(body)
        // console.log("this is creating User...",body);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error:any) {
        let statusError = '';
        // console.log("body: 000000::  ",JSON.stringify(data));
        if (error.code === "P2002") statusError=`${body.email} is already used`;
        return  new Response(JSON.stringify(statusError),{
            status:500,
            statusText:statusError
        })
    }
}
