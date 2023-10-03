import { NextRequest } from "next/server";
import { changeContactOfAPage, createContactOfAPage } from "../../../../prisma/contact";

export async function POST(request:NextRequest){
    const data = await request.json();
    const newContact = {
        facebook:data.facebook,
        twitter:data.twitter,
        whatsapp:data.whatsapp,
        telegram:data.telegram,
        pageId:data.pageId,
    }
    try {
        const createContact = await createContactOfAPage(newContact);
        return new Response(JSON.stringify(createContact),{
            status:200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500,
        })
    }
}

export async function PUT(request:NextRequest){
    const data = await request.json();
    const newContact = {
        facebook:data.facebook,
        twitter:data.twitter,
        whatsapp:data.whatsapp,
        telegram:data.telegram,
        pageId:data.pageId,
    }
    try {
        const changeContact = await changeContactOfAPage(newContact);
        return new Response(JSON.stringify(changeContact),{
            status:200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500,
        })
    }
}