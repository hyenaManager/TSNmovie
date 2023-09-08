import axios from "axios"
export const getPages = async () => {
     const response = await axios.get("http://localhost:4000/pages")
     const data : {name: string;
          id: number;
          image: string;} = response.data
    return response.data
    }