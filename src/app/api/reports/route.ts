import { NextRequest } from "next/server";
import { createAReport, deletReportById, getAllReports } from "../../../../prisma/reports";

export async function GET(request:NextRequest){
    try {
        const allReports = await getAllReports();
        return new Response(JSON.stringify(allReports),{
        status:200
    })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}

export async function POST(request:NextRequest){
    try {
        const data = await request.json();
        const respone = await createAReport(data);
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}

export async function DELETE(request:NextRequest){
    try {
        const url = new URL(request.url)
        const reportId = url.searchParams.get("reportId") as string
        const respone = await deletReportById(reportId)
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}