"use client";
import Loading from "@/app/components/loading";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AuthenticationForm() {
  return (
    <main
      className=" min-w-full min-h-[100vh] bg-gray-200 flex flex-col justify-center items-center bg-cover"
      style={{
        backgroundImage: "url(/bruh.png)",
      }}
    >
      <h2 className=" font-mono text-4xl p-2 text-start w-5hundred font-bold text-fuchsia-700">
        YOKEPLAY
      </h2>

      <RegisterForm />
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

  async function handleSubmit() {
    const response = await axios.post("http://yokeplay.vercel.app/api/users", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }
  const mutation = useMutation(handleSubmit, {
    onSuccess: async () =>
      await signIn("credentials", {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        redirect: true,
        callbackUrl: "/clips",
      }),
  });
  return (
    <form
      onSubmit={(e) => {
        setIsSubmiting(true);
        e.preventDefault();
        mutation.mutate();
      }}
      className=" shadow-[0_0_20px_purple] flex justify-center relative flex-col p-4 rounded-lg m-0 bg-black w-5hundred h-5hundred font-mono "
    >
      <div className=" flex">
        <label className=" p-2 text-fuchsia-600  text-2xl">first name </label>
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className=" flex flex-start w-2hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="text"
        />
        <label className=" p-2 text-fuchsia-600  text-2xl">last name </label>
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className=" flex flex-start w-2hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="text"
        />
      </div>
      <label className=" p-2 text-fuchsia-600  text-2xl">Email </label>
      <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="email"
      />
      <label className=" p-2 text-fuchsia-600 text-2xl ">Password </label>
      <input
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="password"
      />
      <label className=" p-2 text-fuchsia-600 text-2xl ">
        confirm password
      </label>
      <input
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
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
