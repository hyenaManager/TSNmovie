import { getMovieByPageOwnerId } from "../../../../../prisma/movies";

export async function GET(request:Request,{params}:{params:{id:string}}){
    const id = params.id
    try {
       //get pageId from body. 
        const movies  = await getMovieByPageOwnerId(id) // and use that pageId to fetch all movies that match id
        console.log("the movie return is ...",movies);
        const data = JSON.stringify(movies)
        return new Response(data,{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}