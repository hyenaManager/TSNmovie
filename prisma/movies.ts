import prisma from "./client";
// type movieType = {
//     id?: string
//     name: string
//     overview?: string | null
//     video: string
//     likes?: string[]
//     createAt?: Date | string
//     updateAt?: Date | string
//     image: string
//     pageOwnerId: string
// }

export async function getMovieByPageOwnerId(pageOwnerId:any){
    try {
        const movies = await prisma.movies.findMany({
            where:{
                pageOwnerId:pageOwnerId
            }
        })
        console.log("its prisma here and moveis is ",movies);
        
        return movies
    } catch (error) {
        return error
    }
}
export async function getAllMovies(){
    try {
        const movies = await prisma.movies.findMany()
        console.log("its prisma here and moveis is ",movies);
        
        return movies
    } catch (error) {
        return error
    }
}

export async function createMovie(data:any){
    try {
        await prisma.movies.create({
            data:data
        })
    } catch (error) {
        return error
    }
}