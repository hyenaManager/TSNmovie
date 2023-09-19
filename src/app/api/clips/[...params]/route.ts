import { NextRequest } from "next/server";
import { stringify } from "querystring";

export async function GET(request:NextRequest,{params}:{params:any}){
    const names = params.params[0]
    const ages = params.params[1]
    try {
    return new Response(JSON.stringify({name:names,age:ages}),{status:200})
    } catch (error) {
        return new Response(JSON.stringify(`error in ${names} and ${ages}`))
    }
}