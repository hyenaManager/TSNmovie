import { getUser } from "../../../../../prisma/users";

export async function GET(request:Request) {
    try {
        const response = await getUser(request.body as any)
        console.log("this is respone...",response);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        console.log(error,"error in user.......")
        return error
    }
}