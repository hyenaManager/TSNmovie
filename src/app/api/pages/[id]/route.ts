import { NextRequest } from "next/server";
import { getSinglePageByName } from "../../../../../prisma/pages";


export async function GET(request:NextRequest,{params}:{params:{id:string}}){
    //note-- params object list mode is used because there is an error in using searchParams.get() method (query method)
    //that always return value to false can't fix at the moment
    try{
        const pageId = params.id
        const page = await getSinglePageByName(pageId);
        return new Response(JSON.stringify(page),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}