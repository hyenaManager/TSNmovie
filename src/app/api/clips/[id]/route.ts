import { NextRequest } from "next/server";
import { getClipsByPageId } from "../../../../../prisma/clips";

export async function GET(request:NextRequest,{params}:{params:{id:string}}) {
    const id = params.id
    const data = await getClipsByPageId(id);
    return new Response(JSON.stringify(data),{
        status:200
    })
}