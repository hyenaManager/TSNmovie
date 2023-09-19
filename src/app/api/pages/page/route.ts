import { NextRequest } from "next/server";
import { getSinglePageByName } from "../../../../../prisma/pages";


export async function GET(request:NextRequest){
    try{
        const url = new URL(request.url)
        
        const pageName:string = url.searchParams.get("pageName") as string

        const page = await getSinglePageByName(pageName,true,true,true);
        return new Response(JSON.stringify(page),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}