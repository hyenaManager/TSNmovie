import { NextRequest } from "next/server";
import { deleteASerie, getSeriesByPageId } from "../../../../../prisma/series";


export async function GET(request:Request,{params}:{params:{id:string}}){
    try {
        const id = params.id
        const data = await getSeriesByPageId(id)
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
    try{
        const id = params.id
        const data = await deleteASerie(id)
        return new Response(JSON.stringify(data),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}