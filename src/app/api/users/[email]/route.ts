import { getUserByMail } from "../../../../../prisma/users";

export async function GET(request:Request,{params}:{params:{email:string}}) {
    const email = params.email
    try {
        const response = await getUserByMail(email)
        // console.log("this is respone...",response);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        console.log(error,"error in user.......")
        return error
    }
}