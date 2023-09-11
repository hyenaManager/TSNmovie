type timeProps = { timeZone: string; hour12: boolean; hour: string; minute: string; }
export const getCurrentTime = ()=>{
    const now = new Date();

    const options = {
    timeZone: 'Asia/Yangon', // myanmar time zone
    hour12: true, // Set to true for 12-hour time format
    hour: 'numeric',
    minute: 'numeric',
    //   second: 'numeric',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options as any);
    const formattedDate = formatter.format(now);

    return formattedDate
}
export const timeSpliter = (duration:number)=>{
    const minutes:number = Math.floor(duration/60);
    const seconds:number = Math.floor(duration % 60);
    return [minutes,seconds]
}