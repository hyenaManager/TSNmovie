export const timeSpliter = (duration)=>{
    const minutes = Math.floor(duration/60);
    const seconds = Math.floor(duration % 60);
    return [parseInt(minutes),parseInt(seconds)]
}