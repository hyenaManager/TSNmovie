import { NextRequest } from "next/server";
import { createEpisode, getEpisodesBySeriesId } from "../../../../prisma/episodes";

export async function GET(request:NextRequest) {
    const url = new URL(request.url)
    const seriesId = url.searchParams.get("seriesId") as string
    try {
        const data = await getEpisodesBySeriesId(seriesId)
        return new Response(JSON.stringify(data),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function POST(request:NextRequest) {
    const {name,episodeNumber,video,seriesId} = await request.json();
    try {
        const createdEpisode = await createEpisode({name:name,episodeNumber:parseInt(episodeNumber),video:video,seriesId:seriesId})
        return new Response(JSON.stringify(createdEpisode),{
            status:200
        })
    } catch (error) {
        console.log("primas error: ",error);
        
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}