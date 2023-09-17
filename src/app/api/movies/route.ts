import { createMovie, getAllMovies, getMovieByPageOwnerId } from "../../../../prisma/movies"

export async function GET(request:Request){
    try {
        const movies  = await getAllMovies() // and use that pageId to fetch all movies that match id
        // console.log("the movie return is ...",movies);
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

export async function POST(request:Request){
    try {
        const data = await request.json()
        const createdMovie = await createMovie(data)
        const respone = JSON.stringify(createdMovie)
        // console.log("its work buddy????")
        // console.log("you create this...",respone)
        return new Response("success!!!!",{
            status:200,
            statusText:"success!!!"
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })        
    }
}