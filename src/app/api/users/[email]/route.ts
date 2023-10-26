import { NextRequest } from "next/server";
import { changeUserImage, deleteUserByEmail, getUserByMail } from "../../../../../prisma/users";

export async function GET(request:Request,{params}:{params:{email:string}}) {
    const email = params.email
    try {
        const response = await getUserByMail(email)
        // console.log("this is respone...",response);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        console.log(error,"error in user.......")
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function PUT(request:NextRequest,{params}:{params:{email:string}}){
    const data = await request.json();
    const email = params.email
    try{
        const response = await changeUserImage(data.image,email)
        return new Response(JSON.stringify(response),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function DELETE(request:NextRequest,{params}:{params:{email:string}}){
    const email = params.email
    try {
        const respone = await deleteUserByEmail(email);
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}