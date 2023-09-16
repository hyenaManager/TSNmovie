import { getSinglePageByName } from "../../../../../prisma/pages";


export async function GET(request:Request,{params}:{params:{name:string}}){
    try{
        const pageName = params.name
        const page = await getSinglePageByName(pageName);
        return new Response(JSON.stringify(page),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}