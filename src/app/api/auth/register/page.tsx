"use client";
import Loading from "../../../../components/loading";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import bgImage from "public/bruh.png";
import Image from "next/image";

export default function AuthenticationRegister() {
  return (
    <main className="pageWarper min-w-full relative min-h-[100vh] bg-gray-200 flex flex-col justify-center items-center">
      <h2 className=" font-mono text-4xl p-2 text-start xsm:w-[50%] sm:w-5hundred font-bold z-10 text-fuchsia-700">
        YOKEPLAY
      </h2>
      <Toaster />
      <RegisterForm />
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

function RegisterForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [statusError, setStatusError] = useState("");
  const router = useRouter();

  // console.log(errorStatus);

  async function handleSubmit() {
    const response = await axios.post(
      "https://yokeplay.vercel.app/api/users",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: async () => {
      try {
        const response = await signIn("credentials", {
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
          redirect: true,
          callbackUrl: "/clips",
        });
        //setIsSubmiting(false);
        if (response?.ok) {
          toast("user creation success ", {
            style: {
              fontSize: "20px",
              color: "green",
            },
            icon: "🔑",
            duration: 4000,
          });
          router.push("/clips");
        }
      } catch (error) {
        console.log(error);
        setIsSubmiting(false);
        return error;
      }
    },
    onError: (error: any) => {
      console.log(error);

      setStatusError(error.response.data);
      setIsSubmiting(false);
    },
  });
  useEffect(() => {
    if (mutation.error) {
      toast(statusError, {
        duration: 5000,
        icon: "🗿",
        style: {
          fontSize: "25px",
        },
      });
    }
  }, [mutation.error]);
  return (
    <form
      onSubmit={(e) => {
        setIsSubmiting(true);
        e.preventDefault();
        mutation.mutate();
      }}
      className="pageWarper xsm:w-[96vw] sm:w-[60vw] z-10 shadow-[0_0_20px_purple] flex justify-center relative flex-col xsm:p-3 sm:p-4 rounded-lg m-0 bg-black font-mono "
    >
      <label className=" p-1 text-fuchsia-600  text-lg">first name </label>
      <input
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className=" flex flex-start xsm:w-[90%] sm:w-[95%] ml-2 mr-2 text-lg rounded-md sm:p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="text"
      />
      <label className=" p-1 text-fuchsia-600  text-lg">last name </label>
      <input
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className=" flex flex-start xsm:w-[90%] sm:w-[95%] ml-2 mr-2 text-lg rounded-md sm:p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="text"
      />

      <label className=" p-2 text-fuchsia-600  text-lg">Email </label>
      <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" flex flex-start xsm:w-[90%] sm:w-[95%] ml-2 mr-2 text-lg rounded-md sm:p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="email"
      />
      <label className=" p-2 text-fuchsia-600 text-lg ">Password </label>
      <input
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className=" flex flex-start xsm:w-[90%] sm:w-[95%] ml-2 mr-2 text-lg rounded-md sm:p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="password"
      />
      <label className=" p-2 text-fuchsia-600 text-lg ">confirm password</label>
      <input
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        className=" flex flex-start xsm:w-[90%] sm:w-[95%] ml-2 mr-2 text-lg rounded-md sm:p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="password"
      />

      <button
        disabled={isSubmiting}
        type="submit"
        className=" text-white hover:bg-fuchsia-400 p-2 w-[90px] h-[50px] bg-fuchsia-600 rounded-md m-3"
      >
        Register
      </button>
      {isSubmiting && <Loading />}
    </form>
  );
}
