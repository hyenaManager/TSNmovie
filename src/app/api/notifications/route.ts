import { getAllNotifications } from "../../../../prisma/notifications";

export async function GET(request:Request){
    try {
        const data = await getAllNotifications()
        return new Response(JSON.stringify(data),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}