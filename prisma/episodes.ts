import prisma from "./client";

export async function getEpisodesBySeriesId(seriesId:string) {
    try {
        const episodes = await prisma.episodes.findMany({
            where:{
                seriesId:seriesId
            }
        })
        return episodes
    } catch (error) {
        return error        
    }
}

export async function createEpisode(data:{name:string;episodeNumber:number;seriesId:string;video:string;}) {
    try {
        const createdEpisode = await prisma.episodes.create({
            data:data
        })
        return createdEpisode
    } catch (error) {
        return error
    }
}