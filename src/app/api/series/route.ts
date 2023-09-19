import { createSeries, getAllSeries } from "../../../../prisma/series";

export async function GET(request:Request){
    try {
        const data = await getAllSeries()
        return new Response(JSON.stringify(data),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function POST(request:Request){
    const data = await request.json()
    try{
        const createdData = await createSeries(data);
        return new Response(JSON.stringify(createdData),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}