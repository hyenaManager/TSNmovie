import prisma from "./client";

export async function getAllPages(){
    const pages = await prisma.page.findMany()
    return pages
}

export async function createPage(data:any){
    try{
        await prisma.page.create({
            data:data,
       
        })
    }catch(error){
        throw error
    }
}

export async function newFollower(userId:string,pageId:string){
    try {
        await prisma.page.update({
            where:{
                id:pageId,
            },
            data:{
                followers:{
                    connect:{
                        id:userId
                    }
                }
            }
        })
    } catch (error) {
        throw error
    }
}

export async function unfollow(userId:string,pageId:string){
    try {
        await prisma.page.update({
            where:{
                id:pageId,
            },
            data:{
                followers:{
                    disconnect:{
                        id:userId
                    }
                }
            }
        })
    } catch (error) {
        throw error
    }
}

export async function getSinglePageByPageId(pageId:string){
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
            followers:true,
            contact:true,
        }
    })
    return page
   } catch (error) {
    console.log("yes prisma get page error");
    
    throw error
   }
}
//update profile picture ,cover piture and name 
export async function updatePageProfilePicture(pageId:string,image:string,updateType:string,name:string){

    try {
        if (updateType==="notCover"){
            await prisma.page.update({
                where:{
                    id:pageId
                },
                data:{
                    image:image
                }
            })
        }
        if (updateType==="name"){
            await prisma.page.update({
                where:{
                    id:pageId
                },
                data:{
                    name:name
                }
            })
        }
        
        if(updateType==="cover"){
            await prisma.page.update({
                where:{
                    id:pageId
                },
                data:{
                    coverImage:image
                }
            })
        }
    } catch (error) {
        throw error
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

//delete page
export async function deleteAPage(pageId:string){
    try {
        await prisma.page.delete({
            where:{
                id:pageId
            }
        })
        return "delete success"
    } catch (error) {
        throw error
    }
}