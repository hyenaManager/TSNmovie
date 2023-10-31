import { NextRequest } from "next/server";
import { suspendUserByEmail } from "../../../../../prisma/users";

export async function POST(request:NextRequest){
    const body = await request.json()
    try {
        const userEmail = body.userEmail
        const response = await suspendUserByEmail(userEmail)
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}