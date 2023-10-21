
export const catchingError = (status:number)=>{
    if (status === 0){
        return "please check internet connection"
    }
    if (status <=400){
        return "server error"
    }
    if (status>400){
        return "internal error"
    }
}