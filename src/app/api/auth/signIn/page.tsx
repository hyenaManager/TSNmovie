"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import bgImage from "public/bruh.png";

export default function AuthenticationLogin() {
  return (
    <main className="pageWarper min-w-full h-[100vh] bg-gray-200 flex flex-col justify-center items-center relative">
      <h2 className=" z-10 font-mono text-4xl p-2 text-start xsm:w-[50%] sm:w-5hundred font-bold text-fuchsia-700">
        YOKEPLAY
      </h2>
      <Toaster />
      <LoginForm />
      <Image
        src={bgImage}
        placeholder="blur"
        alt="bgImage"
        fill
        className=" bg-cover z-0"
      />
    </main>
  );
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const router = useRouter();
  let loginStatus: string = "username or password is wrong 🤔";
  async function handleSubmit() {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (!response?.error) {
      setErrorLogin(false);
      toast("login success ", {
        style: {
          fontSize: "20px",
          color: "green",
        },
        icon: "🗝️",
        duration: 3000,
      });
      router.push("/clips");
    } else {
      toast.error("there is an error");
      setErrorLogin(true);
      setIsSubmiting(false);
    }
  }

  return (
    <>
      {errorLogin && (
        <p className=" text-red-400 text-lg text-center p-2 bg-black m-1 z-10 rounded-md">
          {loginStatus}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmiting(true);
          handleSubmit();
        }}
        className="pageWarper xsm:w-[96vw] sm:w-[50vw] relative shadow-[0_0_20px_purple] z-10 flex justify-center items-center flex-col p-4 rounded-lg m-0 bg-black h-3hundred font-mono "
      >
        <label className=" p-2 text-fuchsia-600  text-2xl  w-4hundred xsm:text-center sm:text-start ">
          Email
        </label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" flex flex-start xsm:w-[90%] sm:w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="email"
        />
        <label className=" p-2 text-fuchsia-600 text-2xl w-4hundred xsm:text-center sm:text-start ">
          Password
        </label>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className=" flex flex-start xsm:w-[90%] sm:w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="password"
        />
        <button className=" text-white hover:bg-fuchsia-400 p-2 w-[90px] h-[50px] bg-fuchsia-600 rounded-md m-3">
          Login
        </button>
      </form>
      <div className=" flex items-center z-10 justify-between p-2 ">
        <p className=" drop-shadow-md text-white">
          {`Still haven't account?`}{" "}
        </p>
        <button
          onClick={() => router.push("/api/auth/register")}
          type="button"
          className="text-white bg-fuchsia-600 text-sm drop-shadow-md p-1  rounded-md m-1"
        >
          register now
        </button>
        {isSubmiting && <Loading />}
      </div>
    </>
  );
}
