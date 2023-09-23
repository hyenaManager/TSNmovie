import { NextRequest } from "next/server";
import { getClipsByCursor } from "../../../../../prisma/clips";

export async function GET(request:NextRequest) {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") as string;
    console.log(cursor);
    
    try {
        const clips = await getClipsByCursor(parseInt(cursor))
        return new Response(JSON.stringify(clips),{
            status:200,
            
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
    
}