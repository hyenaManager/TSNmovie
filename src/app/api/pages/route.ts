import { NextRequest } from "next/server";
import { createPage, getAllPages, newFollower, unfollow } from "../../../../prisma/pages";

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

export async function POST(request:Request){// for getting and start creating page
    try{
        const pageData = await request.json()
        // console.log("this is page post ...",data);
        
        const createdPage =  await createPage(pageData);
        return new Response(JSON.stringify(createdPage),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function PUT(request:NextRequest) {
    const request_data = await request.json()

    try {
        if(request_data.unfollow){
            const updatedData = await unfollow(request_data.userId,request_data.pageId)
            return new Response(JSON.stringify(updatedData),{
                status:200
            })

        }else{
            const updatedData = await newFollower(request_data.userId,request_data.pageId)
            return new Response(JSON.stringify(updatedData),{
                status:200
            })
        }
        
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}