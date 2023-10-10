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
        throw error        
    }
}

export async function createEpisode(data:any) {
    // console.log("reach in episode prisma and  this is data :",data);
    try {
        const createdEpisode = await prisma.episodes.create({
            data:data
        })
        
        return createdEpisode
    } catch (error) {
        throw error
    }
}