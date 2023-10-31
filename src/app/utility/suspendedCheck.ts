type suspendedUser = {
    endDate: Date,
    id: string,
    message: string,
    startDate: Date,
    suspendedUserEmail: string
}

export const isSuspended = async (isSuspended:suspendedUser)=>{
    
    const currentTime = new Date();
    const banExpirationDate = new Date(isSuspended.endDate )
    if (isSuspended && currentTime<banExpirationDate){
        const timeDifferenceInMilliseconds = banExpirationDate.getTime() - currentTime.getTime();

        // Convert milliseconds to seconds, minutes, and hours
        const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        // Calculate remaining minutes and seconds
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;
        const result = {suspended:true,message:`ban remaining time: ${hours}:${remainingMinutes}:${remainingSeconds}`}
        return result
    }
    if (!isSuspended){
        return {suspended:false,message:''}
    }
}