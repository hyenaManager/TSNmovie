import { NextRequest } from "next/server";
import { createClip, deleteAllClips, getAllClips } from "../../../../prisma/clips";

export async function GET(request:Request){
    try {
        const clips = await getAllClips()
        return new Response(JSON.stringify(clips),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function POST(request:Request){
    try {
        const data = await request.json()
        const clip = await createClip(data)
        return new Response(JSON.stringify(clip),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const response = await deleteAllClips();
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}