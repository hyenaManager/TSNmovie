import axios from "axios"
// export const getPages = async () => {
//      const response = await axios.get("http://localhost:4000/pages")
     
//     return response.data
//     }
export const getSeries = async (url:string) => {
     const response = await axios.get(url)
     return response.data
}
export const getPages = async () => {
     try {
          const response = await axios.get("http://localhost:4000/pages");
          return response.data
        } catch (err) {
          throw err;
        }
   }