import { NextRequest } from "next/server";
import {deleteAPage, getSinglePageByPageId, updatePageProfilePicture} from "../../../../../prisma/pages";


export async function GET(request:NextRequest,{params}:{params:{id:string}}){
    //note-- params object list mode is used because there is an error in using searchParams.get() method (query method)
    //that always return value to false can't fix at the moment
    try{
        const pageId = params.id
        const page = await getSinglePageByPageId(pageId);
        return new Response(JSON.stringify(page),{
            status:200
        })
    }catch(error){
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function PUT(request:NextRequest) {
    const {pageId,image,updateType,name} = await request.json()

    try {
        const updatedData = await updatePageProfilePicture(pageId,image,updateType,name)
        return new Response(JSON.stringify(updatedData),{
            status:200
        })

      
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}
export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const pageId = params.id
    try {
        const response = await deleteAPage(pageId);
        return new Response(JSON.stringify(response),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}