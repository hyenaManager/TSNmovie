import { NextRequest } from "next/server";
import { deleteEpisode, getEpisodesBySeriesId } from "../../../../../prisma/episodes";

export async function GET(request:NextRequest,{params}:{params:{id:string}}) {
    const seriesId = params.id
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

export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const episodeId = params.id
    try {
        const response = await deleteEpisode(episodeId)
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}