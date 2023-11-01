import { NextRequest } from "next/server";
import { getPageBySearchText, updateSearch } from "../../../../../prisma/pages";

export async function GET(request:NextRequest){
    const url = new URL(request.url)
    try {
        const pages = await getPageBySearchText(url.searchParams.get("pageName") as string);
        return new Response(JSON.stringify(pages))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}

export async function PUT(request:NextRequest){
    try {
        const respone = await updateSearch();
        return new Response(JSON.stringify(respone))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}