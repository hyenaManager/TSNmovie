"use client";
import { userProvider } from "@/app/context/userContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useCreatingPage } from "@/app/store";
import { useSearchParams } from "next/navigation";

export default function Contact() {
  const [facebookLink, setFacebookLink] = useState(""); //
  const [whatsappLink, setWhatsappLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const params = useSearchParams();
  const createdPageId = params.get("pageId");
  async function createContact() {
    const response = await axios.post(
      "https://yokeplay.vercel.app/api/contact",
      {
        facebook: facebookLink,
        twitter: twitterLink,
        whatsapp: whatsappLink,
        telegram: telegramLink,
        pageId: createdPageId,
      }
    );
    if (response.status === 200) {
      toast.success("working.....");
    } else {
      setIsSubmiting(false);
      toast.error(response.statusText);
    }
  }
  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      toast.success("congratulation you just made a page ", {
        duration: 5000,
      });
      setIsFinish(true);
    },
  });
  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="fixed pageWarper z-50 top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center ">
      {mutation.isPending && (
        <h1 className=" text-4xl text-black text-center">
          Creating contact....
        </h1>
      )}
      {isFinish && (
        <div className=" border shadow-xl rounded-md flex flex-col justify-center items-center xsm:w-[95vw] sm:w-[40vw] bg-white xsm:h-full sm:h-[60vh]">
          <motion.img
            initial={{ opacity: 1, scale: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.7 }}
            className="fixed top-50 right-50 z-50"
            src={"/leonardo.gif"}
            alt="success"
          />
          <Link
            href={"/profile/page"}
            className=" p-2 bg-green-500 z-50 text-white rounded-md text-4xl font-mono cursor-pointer hover:bg-green-800"
          >
            Visit your page
          </Link>
        </div>
      )}
    </div>
  );
}
//   return (
//     <div className="fixed pageWarper z-50 top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center ">
//       <ul className=" border rounded-md flex flex-col justify-center items-center xsm:w-[95vw] sm:w-[40vw] bg-fuchsia-600 xsm:h-full sm:h-[60vh] ">
//         <h3 className=" p-2 text-xl text-white text-center">
//           Add social account link to contact you or you can skip for now
//         </h3>
//         <li className=" w-[90%] xsm:m-0 sm:m-2 text-center xsm:max-h-fit sm:h-[50px] flex bg-white justify-center xsm:flex-col sm:flex-row items-center p-2 rounded-xl text-xl">
//           <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
//             Facebook
//           </h2>
//           <input
//             type="text"
//             value={facebookLink}
//             onChange={(e) => setFacebookLink(e.target.value)}
//             className={
//               "w-full outline-fuchsia-600 xsm:p-1 sm:p-2 sm:ml-2 xsm:h-[20px] sm:h-[40px] xsm:text-sm sm:text-lg text-slate-800 text-center "
//             }
//           />
//         </li>
//         <li className=" w-[90%] xsm:m-0 sm:m-2 text-center xsm:max-h-fit sm:h-[50px] flex bg-white justify-center xsm:flex-col sm:flex-row items-center p-2 rounded-xl text-xl">
//           <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
//             Telegram
//           </h2>
//           <input
//             type="text"
//             value={telegramLink}
//             onChange={(e) => setTelegramLink(e.target.value)}
//             className={
//               "w-full outline-fuchsia-600 xsm:p-1 sm:p-2 sm:ml-2 xsm:h-[20px] sm:h-[40px] xsm:text-sm sm:text-lg text-slate-800 text-center "
//             }
//           />
//         </li>
//         <li className=" w-[90%] xsm:m-0 sm:m-2 text-center xsm:max-h-fit sm:h-[50px] flex bg-white justify-center xsm:flex-col sm:flex-row items-center p-2 rounded-xl text-xl">
//           <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
//             Whatsapp
//           </h2>
//           <input
//             type="text"
//             value={whatsappLink}
//             onChange={(e) => setWhatsappLink(e.target.value)}
//             className={
//               "w-full outline-fuchsia-600 xsm:p-1 sm:p-2 sm:ml-2 xsm:h-[20px] sm:h-[40px] xsm:text-sm sm:text-lg text-slate-800 text-center "
//             }
//           />
//         </li>
//         <li className=" w-[90%] xsm:m-0 sm:m-2 text-center xsm:max-h-fit sm:h-[50px] flex bg-white justify-center xsm:flex-col sm:flex-row items-center p-2 rounded-xl text-xl">
//           <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
//             Twitter
//           </h2>
//           <input
//             type="text"
//             value={twitterLink}
//             onChange={(e) => setTwitterLink(e.target.value)}
//             className={
//               "w-full outline-fuchsia-600 xsm:p-1 sm:p-2 sm:ml-2 xsm:h-[20px] sm:h-[40px] xsm:text-sm sm:text-lg text-slate-800 text-center "
//             }
//           />
//         </li>
//       </ul>

//       <button
//         disabled={isSubmiting}
//         onClick={() => {
//           mutation.mutate();
//           setIsSubmiting(true);
//         }}
//         className=" p-2 bg-green-500 rounded-md text-lg text-white"
//       >
//         Finished
//       </button>
//     </div>
//   );
// }
