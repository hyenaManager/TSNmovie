import prisma from "./client";

export async function getSeriesByPageId(pageOwnerId:string){
    try {
        const series = await prisma.series.findMany({
            where:{
                pageOwnerId:pageOwnerId
            },
            include:{
                episodes:true
            }
        })
        return series
    } catch (error) {
        return error
    }
}

export async function getAllSeries(){
    try {
        const series = await prisma.series.findMany()
        return series
    } catch (error) {
        return error
    }
}
export async function createSeries(data:any){
    try {
        const series = await prisma.series.create({
            data:data
        })
    } catch (error) {
        
    }
}