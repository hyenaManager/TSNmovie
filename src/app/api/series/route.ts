import { getAllSeries } from "../../../../prisma/series";

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