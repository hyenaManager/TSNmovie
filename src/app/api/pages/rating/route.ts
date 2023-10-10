import { NextRequest } from "next/server";
import { ratePage } from "../../../../../prisma/pages";

export async function PUT(request:NextRequest){
    const {newRaterList,newRating,pageId} = await request.json();
    try {
        const respone = await ratePage(newRaterList,pageId,newRating);
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}