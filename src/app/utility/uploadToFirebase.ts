import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import toast from "react-hot-toast";

export const uploadFileToFirebase =async (file:File,fileDirectory:string,setUrl:(url:string)=>void)=>{
  let imgUrl = "";
    const fileName = `${fileDirectory}/${file.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, file);
    // set up an event listener to track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
      },
      (error) => {
        console.log(error);
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          toast.success("uploaded successfully!");
          console.log("work somehow and url:::",url);
          
          setUrl(url)
        });
      }
    );
  
}