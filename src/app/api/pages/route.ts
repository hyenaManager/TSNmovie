import { getAllPages } from "../../../../prisma/pages";

export async function GET(request:Request) {
    try {
        const response = await getAllPages()
        console.log("this is respone...",response);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        console.log(error,"errrrrrrrorrrr.......")
        return error
    }
}
// export async function GET(request:Request) {
//     return new Response("hello .....",{
//         status:200
//     })
// }