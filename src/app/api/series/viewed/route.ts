import { NextRequest } from "next/server";
import { addView } from "../../../../../prisma/series";

export async function PUT(request:NextRequest){
    try {
        const {viewList,seriesId}:{viewList:string[],seriesId:string} = await request.json();
        const response = await addView(viewList,seriesId)
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:200
        })
    }
}