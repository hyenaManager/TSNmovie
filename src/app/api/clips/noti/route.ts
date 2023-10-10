import { NextRequest } from "next/server";
import { getAClipByClipId } from "../../../../../prisma/clips";

export async function GET(request:NextRequest){
    try {
        const url = new URL(request.url);
        const clipId = url.searchParams.get("clipId") as string;
        const clip = await getAClipByClipId(parseInt(clipId))
        return new Response(JSON.stringify(clip),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}