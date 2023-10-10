import { NextRequest } from "next/server";
import { createComment, deleteComment, replyComment } from "../../../../prisma/comment";


export async function POST(request:NextRequest){
    const data = await request.json();
    try {
       if(data.mode==="comment"){
        const respone = await createComment(data);
        return new Response(JSON.stringify(respone),{
            status:200
        })
       }
       if(data.mode==="reply"){
        const respone = await replyComment(data);
        return new Response(JSON.stringify(respone),{
            status:200
        })
       }
       return new Response(JSON.stringify("nothing"),{
        status:200
       })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}
export async function DELETE(request:NextRequest){
    const url = new URL(request.url);
    const commentId = url.searchParams.get("commentId") as string;
    try {
        const respone = await deleteComment(commentId)
        return new Response(JSON.stringify(respone),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

