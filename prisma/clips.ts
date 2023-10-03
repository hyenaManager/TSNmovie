import prisma from "./client";
type clipType = {
    id: string;
    title: string | null;
    video: string;
    likes: string[];
    link: string | null;
    createAt: Date;
    updateAt: Date;
    pageOwnerId: string;
}

export async function getAllClips() {
    try {
        const clips = await prisma.clips.findMany({
            include:{
                createdBy:true
            },
            orderBy:{
                createAt:"desc"
            }
        });
        return clips
    } catch (error) {
        return error
    }
}

export async function getClipsByCursor(cursor:number) {
    const clipCount = await prisma.clips.count();//counting all clips count for nextCursor whether fetching next page is available or not
    try {
        const clips = await prisma.clips.findMany({
            take:2,
            skip:cursor,
            include:{
                createdBy:true,
                likes:true
            },
            // cursor:{
            //     id:cursor
            // },
            orderBy:{
                id:"asc"
            }
        });
      
        const nextCursor = cursor+2 <= clipCount-1 ? cursor+2:null //return nextcursor for fetchNextPage's cursor
        return {clips,nextCursor}
    } catch (error) {
        return error
    }
}

export async function getClipsByPageId(id:string) {
    try {
        const clips = await prisma.clips.findMany({
            where:{
                pageOwnerId:id
            },
            include:{
                createdBy:true
            }
        });
        return clips
    } catch (error) {
        throw error
    }
}

export async function createClip(data:clipType) {
    try {
        const createClip = await prisma.clips.create({
            data:data as any
        })
        return createClip
    }catch(error){
        throw error
    }
}

export async function deleteAllClips() {
    try {
        await prisma.clips.deleteMany({});
        return "delete success"
    } catch (error) {
        throw error
    }
}

export async function deleteAClip(clipId:number){
    try {
        await prisma.clips.delete({
            where:{
                id:clipId
            }
        })
        return "burn it successfully 🔥"
    } catch (error) {
        throw error
    }
}

export async function likeAClip(clipId:number,userId:string){
    try {
        await prisma.clips.update({
            where:{
                id:clipId
            },
            data:{
                likes:{
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

export async function removeLikeFromClip(clipId:number,userId:string){
    try {
        await prisma.clips.update({
            where:{
                id:clipId
            },
            data:{
                likes:{
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