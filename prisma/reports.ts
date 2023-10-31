import prisma from "./client";

export async function getAllReports(){
    try {
        const reports = await prisma.reports.findMany({
            include:{
                post:true,
                postOwner:true,
            }
        });
        return reports
    } catch (error) {
        return error
    }
}

export async function createAReport(data:any){
    try {
        await prisma.reports.create({
            data:{
                postId:data.postId,
                userId:data.userId,
                title:data.title,
                message:data.title
            }
        })
        return "success"
    } catch (error) {
        return error
    }
}

export async function deletReportById(id:string){
    try {
        await prisma.reports.delete({
            where:{
                id:id
            }
        })
        return "delete success"
    } catch (error) {
        return error
    }
}