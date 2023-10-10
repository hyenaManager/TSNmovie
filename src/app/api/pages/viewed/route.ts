import { NextRequest } from "next/server";
import { addView } from "../../../../../prisma/pages";

export async function PUT(request:NextRequest){
    try {
        const {viewCount,pageId}:{viewCount:string[],pageId:string} = await request.json();
        const response = await addView(viewCount,pageId)
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:200
        })
    }
}