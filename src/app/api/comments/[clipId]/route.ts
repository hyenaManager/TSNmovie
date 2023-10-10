import { NextRequest } from "next/server";
import { getCommentsByClipId } from "../../../../../prisma/comment";

export async function GET(request:NextRequest,{params}:{params:{clipId:string}}){
    const clipId = params.clipId
    try {
        const comments = await getCommentsByClipId(parseInt(clipId))
        return new Response(JSON.stringify(comments),{
            status:200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}