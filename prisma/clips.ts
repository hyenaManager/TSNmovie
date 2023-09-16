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
            }
        });
        return clips
    } catch (error) {
        return error
    }
}

export async function createClip(data:clipType) {
    try {
        const createClip = await prisma.clips.create({
            data:data 
        })
        return createClip
    }catch(error){
        return error
    }
}