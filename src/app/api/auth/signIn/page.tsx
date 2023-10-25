"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Loading from "@/app/components/loading";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function AuthenticationForm() {
  return (
    <main
      className="pageWarper min-w-full min-h-[100vh] bg-gray-200 flex flex-col justify-center items-center bg-cover"
      style={{
        backgroundImage: "url(/bruh.png)",
      }}
    >
      <h2 className=" font-mono text-4xl p-2 text-start xsm:w-[50%] sm:w-5hundred font-bold text-fuchsia-700">
        YOKEPLAY
      </h2>
      <Toaster />
      <LoginForm />
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
      toast.error("password or email incorrect");
      setErrorLogin(true);
      setIsSubmiting(false);
    }
  }

  return (
    <>
      {errorLogin && (
        <p className=" text-red-400 text-lg text-center p-2 bg-black m-1 rounded-md">
          {loginStatus}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmiting(true);
          handleSubmit();
        }}
        className="pageWarper xsm:w-[96vw] sm:w-[60vw] relative shadow-[0_0_20px_purple] flex justify-center items-center flex-col p-4 rounded-lg m-0 bg-black w-5hundred h-4hundred font-mono "
      >
        <label className=" p-2 text-fuchsia-600  text-2xl  w-4hundred xsm:text-center sm:text-start ">
          Email
        </label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" flex flex-start xsm:w-[70%] sm:w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="email"
        />
        <label className=" p-2 text-fuchsia-600 text-2xl w-4hundred xsm:text-center sm:text-start ">
          Password
        </label>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className=" flex flex-start xsm:w-[70%] sm:w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="password"
        />
        <button className=" text-white hover:bg-fuchsia-400 p-2 w-[90px] h-[50px] bg-fuchsia-600 rounded-md m-3">
          Login
        </button>
      </form>
      <div className=" flex items-center justify-between p-2 ">
        <p className=" drop-shadow-md text-white">
          {`Still haven't account?`}{" "}
        </p>
        <Link
          href={"/api/auth/register"}
          className="text-fuchsia-600 hover:text-white hover:bg-fuchsia-600 text-lg drop-shadow-md p-1  rounded-md bg-black m-1"
        >
          register now
        </Link>
        {isSubmiting && <Loading />}
      </div>
    </>
  );
}
