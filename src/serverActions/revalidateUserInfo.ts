"use server"

import { revalidateTag } from "next/cache"

export  const revalidateNavUser = async()=>{
    return revalidateTag("navUser")
}