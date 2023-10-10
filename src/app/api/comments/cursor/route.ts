import { NextRequest } from "next/server";
import { getCommentsByCursor } from "../../../../../prisma/comment";

export async function GET(request:NextRequest) {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") as string;
    const parentId = url.searchParams.get("parentId") as string;
  
    
    try {
        const comments = await getCommentsByCursor(parseInt(cursor),parentId)
        return new Response(JSON.stringify(comments),{
            status:200,
            
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
    
}