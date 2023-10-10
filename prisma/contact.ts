import prisma from "./client"

export async function changeContactOfAPage(data:any){
    try {
        const changePageContact = await prisma.contact.update({
            where:{
                pageId:data.pageId
            },
            data:data
        })
        return changePageContact
    } catch (error) {
        throw error
    }
}

export async function createContactOfAPage(data:any){
    try {
        const changePageContact = await prisma.contact.create({
            data:data
        })
        return changePageContact
    } catch (error) {
        throw error
    }
}