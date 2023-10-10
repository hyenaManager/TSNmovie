import { NextRequest } from "next/server";
import { deleteAClip, getClipsByPageId } from "../../../../../prisma/clips";

export async function GET(request:NextRequest,{params}:{params:{id:string}}) {
    const id = params.id
    const data = await getClipsByPageId(id);
    return new Response(JSON.stringify(data),{
        status:200
    })
}

export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const id = params.id
    try {
        const response = await deleteAClip(parseInt(id))
        return new Response(JSON.stringify(response),{
            status:200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}