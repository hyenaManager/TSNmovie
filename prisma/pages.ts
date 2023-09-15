import prisma from "./client";

export async function getAllPages(){
    const pages = await prisma.page.findMany()
    return pages
}