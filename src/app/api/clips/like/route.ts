import { NextRequest } from "next/server";
import { likeAClip, removeLikeFromClip } from "../../../../../prisma/clips";
export async function PUT(request:NextRequest){
    const url = new URL(request.url)
    const clipId:number = parseInt(url.searchParams.get("clipId") as any)
    const userId:string = url.searchParams.get("userId") as string
    const type:string = url.searchParams.get("type") as string 
    const pageId:string = url.searchParams.get("pageId") as string
    
    try {
        if(type==="addLike"){
            const response = await likeAClip(clipId,userId,pageId)
            return new Response(JSON.stringify(response),{
                status:200
            })
        }
        if(type==="removeLike"){
            const response = await removeLikeFromClip(clipId,userId,pageId)
            return new Response(JSON.stringify(response),{
                status:200
            })
        }
        return new Response("error",{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}