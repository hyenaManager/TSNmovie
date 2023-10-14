import { NextRequest } from "next/server";
import { createEpisode, getAllEpisodes } from "../../../../prisma/episodes";


export async function GET(request:NextRequest){
    try {
        const notifications = await getAllEpisodes();
    return new Response(JSON.stringify(notifications),{
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