import { createPage, getAllPages } from "../../../../prisma/pages";

export async function GET(request:Request) {//called from streamers / main.tsx
    try {
        const response = await getAllPages()
        // console.log("this is respone...",response);
        const data = JSON.stringify(response)
        
        return new Response(data,{
            status:200
        })
    } catch (error) {
        console.log(error,"errrrrrrrorrrr.......")
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function POST(request:Request){//called and post from getting and start creating page
    try{
        const data = await request.json()
        // console.log("this is page post ...",data);
        
        await createPage(data);
        return new Response("Success...",{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}
