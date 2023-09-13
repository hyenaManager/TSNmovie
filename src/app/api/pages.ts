import { NextApiResponse } from "next";
import prisma from "../../../prisma/client";
export default async function handler(request: Request,res:NextApiResponse) {
    const data = await prisma.page.findMany()
    console.log(res.json);
    
    return res.status(200).json(data)
}
 
