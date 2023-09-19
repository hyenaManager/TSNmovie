import { NextRequest } from "next/server";
import { getSinglePageByName } from "../../../../../prisma/pages";


export async function GET(request:NextRequest,{params}:{params:{page:string[]}}){
    //note-- params object list mode is used because there is an error in using searchParams.get() method (query method)
    //that always return value to false can't fix at the moment
    try{
        const pageId:string = params.page[0]
        // console.log("log from route clips boolean and id are :",params.page[0],params.page[1]);
        
        const requestClips:boolean = params.page[1] as string === "true";
        const requestMovies:boolean = params.page[2] as string === "true";
        const requestSeries:boolean = params.page[3] as string === "true";
        const page = await getSinglePageByName(pageId,requestClips,requestMovies,requestSeries);
        return new Response(JSON.stringify(page),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}