import prisma from "./client";

export async function getSeriesByPageId(pageId:string){
    try {
        const series = await prisma.series.findUnique({
            where:{
                id:pageId
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
        return series
    } catch (error) {
        throw error
    }
}

export async function deleteASerie(id:string){
    try{
        await prisma.series.delete({
            where:{
                id:id
            }
        })
        return "success"
    }catch(error){
        throw error
    }
}

export async function addView(newViewList:string[],seriesId:string){
    try {
        await prisma.series.update({
            where:{
                id:seriesId
            },
            data:{
                viewedBy:newViewList,
                viewedCount:newViewList.length

            }
        })
        return "success"
    } catch (error) {
        console.log(error);
        
        throw error
    }
}