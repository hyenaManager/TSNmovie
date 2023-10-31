import { NextRequest } from "next/server";
import { updateUserData } from "../../../../../prisma/users";

export async function PUT(request:NextRequest){
    const data = await request.json();
    try {
        const respone = await updateUserData(data)
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}