"use client";
import { userProvider } from "@/app/context/userContext";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export function ChangePageContact() {
  const [editingContact, setEditingContact] = useState(false); //is editing contacts and page name?
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const { user, userPage }: any = useContext(userProvider);

  const queryClient = useQueryClient();
  const handleCheckChanges = () => {
    const isNotChanged: boolean =
      facebookLink === facebook &&
      twitterLink === twitter &&
      whatsappLink === whatsapp &&
      telegramLink === telegram;
    return isNotChanged;
  };
  const handleEditing = () => {
    setEditingContact(!editingContact);
  };
  const { data, status } = useQuery({
    queryKey: ["page", userPage?.id],
    queryFn: async () => {
      const response = await axios.get(
        `https://yokeplay.vercel.app/api/pages/${userPage?.id}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("there is some error in fetching....");
      }
    },
  });
  //create or change contact of page
  const handleChangeOrCreateContact = async () => {
    //create contact if contact is null
    if (data.contact === null) {
      await axios
        .post(`https://yokeplay.vercel.app/api/contact`, {
          facebook: facebookLink,
          whatsapp: whatsappLink,
          telegram: telegramLink,
          twitter: setTwitterLink,
          pageId: userPage?.id,
        })
        .then((res) => toast.success(`create successfully`))
        .catch((error) => toast.error(error.message));
      //or edit contact
    } else {
      await axios
        .put(`https://yokeplay.vercel.app/api/contact`, {
          facebook: facebookLink,
          whatsapp: whatsappLink,
          telegram: telegramLink,
          twitter: twitterLink,
          pageId: userPage?.id,
        })
        .then((res) => toast.success(`change successfully`))
        .catch((error) => toast.error(error.message));
    }
  };
  const mutation = useMutation({
    mutationFn: handleChangeOrCreateContact,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["page", userPage?.id] }),
  });
  //reset edit in contact
  const handleCancelEdit = () => {
    setFacebookLink(data.contact.facebook ? data.contact.facebook : "");
    setTelegramLink(data.contact.telegram ? data.contact.telegram : "");
    setWhatsappLink(data.contact.whatsapp ? data.contact.whatsapp : "");
    setTwitterLink(data.contact.twitter ? data.contact.twitter : "");
  };

  useEffect(() => {
    if (data?.contact) {
      setFacebookLink(data.contact.facebook ? data.contact.facebook : "");
      setTelegramLink(data.contact.telegram ? data.contact.telegram : "");
      setWhatsappLink(data.contact.whatsapp ? data.contact.whatsapp : "");
      setTwitterLink(data.contact.twitter ? data.contact.twitter : "");
    }
  }, [data]);
  const defaultData = { facebook: "", twitter: "", telegram: "", whatsapp: "" };
  const { facebook, twitter, telegram, whatsapp } =
    data?.contact || defaultData;
  return (
    <ul className=" border rounded-b-md flex flex-col justify-center items-center xsm:w-[95vw] sm:w-[40vw] bg-fuchsia-600 h-[50vh] ">
      <div className=" flex justify-center items-center">
        {!editingContact ? (
          <button
            onClick={handleEditing}
            className={" p-2  rounded-md bg-green-500"}
          >
            Edit contact
          </button>
        ) : (
          <button
            onClick={() => {
              handleCancelEdit();
              handleEditing();
            }}
            className={" p-2  rounded-md bg-yellow-300 "}
          >
            cancel edit
          </button>
        )}
        {!handleCheckChanges() && (
          <button
            onClick={() => {
              handleEditing();
              mutation.mutate();
            }}
            className=" p-2 text-white bg-green-500 hover:bg-green-600 rounded-md m-1"
          >
            save
          </button>
        )}
      </div>
      <li className=" w-[90%] m-2 text-center h-[50px] flex bg-white justify-between items-center p-2 rounded-xl text-xl">
        <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
          Telegram
        </h2>
        <input
          type="text"
          disabled={!editingContact}
          value={telegramLink}
          onChange={(e) => setTelegramLink(e.target.value)}
          className={
            "w-full outline-fuchsia-600 p-2 ml-2 h-[40px] text-lg text-slate-800 text-center " +
            (editingContact && " bg-green-400 rounded-xl")
          }
        />
      </li>

      <li className=" w-[90%] m-2 text-center h-[50px] flex bg-white justify-between items-center p-2 rounded-xl text-xl">
        <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
          Facebook
        </h2>
        <input
          type="text"
          disabled={!editingContact}
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
          className={
            "w-full outline-fuchsia-600 p-2 ml-2 h-[40px] text-lg text-slate-800 text-center " +
            (editingContact && " bg-green-400 rounded-xl")
          }
        />
      </li>
      <li className=" w-[90%] m-2 text-center h-[50px] flex bg-white justify-between items-center p-2 rounded-xl text-xl">
        <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
          Twitter
        </h2>
        <input
          type="text"
          disabled={!editingContact}
          value={twitterLink}
          onChange={(e) => setTwitterLink(e.target.value)}
          className={
            "w-full outline-fuchsia-600 p-2 ml-2 h-[40px] text-lg text-slate-800 text-center " +
            (editingContact && " bg-green-400 rounded-xl")
          }
        />
      </li>
      <li className=" w-[90%] m-2 text-center h-[50px] flex bg-white justify-between items-center p-2 rounded-xl text-xl">
        <h2 className="w-[130px] h-full text-slate-800  text-center items-center ">
          Whatsapp
        </h2>
        <input
          type="text"
          disabled={!editingContact}
          value={whatsappLink}
          onChange={(e) => setWhatsappLink(e.target.value)}
          className={
            "w-full outline-fuchsia-600 p-2 ml-2 h-[40px] text-lg text-slate-800 text-center " +
            (editingContact && " bg-green-400 rounded-xl")
          }
        />
      </li>
    </ul>
  );
}
