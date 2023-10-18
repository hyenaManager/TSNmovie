import prisma from "./client";

export async function getCommentsByClipId(clipId:number){
    try {
        const comments = await prisma.comment.findMany({
            where:{
                clipId:clipId
            },
            include:{
                childComments:true,
                user:true
            }
        })
        return comments
    } catch (error) {
        return error
    }
}

export async function createComment({text,userId,clipId}:{text:string,userId:string,clipId:number}){
    try {
        await prisma.comment.create({
            data:{
                text:text,
                userId:userId,
                clipId:clipId,
            }
        })
        return "success"
    } catch (error) {
        return error
    }
}

export async function replyComment({text,userId,parentId,userImage,replyingTo}:{text:string,userId:string,parentId:string,userImage:string,replyingTo:string}){
    try {
        const repliedComment = await prisma.comment.create({
            data:{
                text:text,
                userId:userId,
                parentId:parentId,
                userImage:userImage,
                repliedToUserId:replyingTo
            }
        })
        console.log(repliedComment);
        
        return "success"
    } catch (error) {
        console.log(error);
        
        return error
    }
}

export async function getByCommentId(commentId:string){
    try {
        const comment = await prisma.comment.findUnique({
            where:{
                id:commentId
            }
        })
    } catch (error) {
        return error
    }
}

export async function getCommentsByCursor(cursor:number,parentId:string) {
    //get all replied comment for this parentId(parent comment)
    const count = await prisma.comment.count({
        where:{
            parentId:parentId
        }
    })
    // console.log("count + is :",count);
    // console.log("cursor is:",cursor);
    
    try {
        const comments = await prisma.comment.findMany({
            where:{
                parentId:parentId
            },
            take:3,
            skip:cursor,
            include:{
                user:true,
                repliedTo:true,
            },
            orderBy:{
                id:"desc"
            }
        });
        // console.log("and comments are :",comments);
        
        const nextCursor = (cursor+3 <= count-1) ? cursor+3:null //return nextcursor for fetchNextPage's cursor
        return {comments,nextCursor}
    } catch (error) {
        return error
    }
}

export async function deleteComment(commentId:string){
    try {
         await prisma.comment.delete({
            where:{
                id:commentId
            },
            include:{
                childComments:true
            }
        })
        return "success"
    } catch (error) {
        return error
    }
}