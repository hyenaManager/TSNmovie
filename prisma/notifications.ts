import prisma from "./client";

export async function getAllNotifications(){
    try {
        const data = await prisma.notifications.findMany()
        return data
    } catch (error) {
        return error
    }
}