import prisma from "./client";

export async function getAllPages(){
    const pages = await prisma.page.findMany()
    return pages
}

export async function createPage(data:any){
    try{
        await prisma.page.create({
            data:data
        })
    }catch(error){
        console.log(error)
    }
}

export async function getSinglePageByName(pageId:string){
    // console.log("logging from bruh series and clips",clips)
   try {
    const page = await prisma.page.findUnique({
        where:{
            id:pageId
        },
        include:{
            series:true,
            clips:true,
            movies:true,
        }
    })
    return page
   } catch (error) {
    console.log("yes prisma get page error");
    
    return error
   }
}
export async function getSinglePageById(id:string){
    try {
     const page = await prisma.page.findUnique({
         where:{
             id:id
         }
     })
     return page
    } catch (error) {
     return error
    }
 }