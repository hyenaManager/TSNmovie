"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type AuthenticateProp = {
  handleIsLogin: () => void;
};

export default function AuthenticationForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div
      className=" min-w-full min-h-[100vh] bg-gray-200 flex flex-col justify-center items-center bg-cover"
      style={{
        backgroundImage: "url(/bruh.png)",
      }}
    >
      <h2 className=" font-mono text-4xl p-2 text-start w-5hundred font-bold text-fuchsia-700">
        YOKEPLAY
      </h2>
      {isLogin ? (
        <LoginForm handleIsLogin={() => setIsLogin(false)} />
      ) : (
        <RegisterForm />
      )}
    </div>
  );
}

function LoginForm({ handleIsLogin }: AuthenticateProp) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const router = useRouter();
  let loginStatus: string = "username or password is wrong 🤔";
  async function handleSubmit() {
    setIsSubmiting(true);
    const result = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        console.log(res);
        setErrorLogin(true);
      } else {
        console.log(res);
        router.push("/feed");
      }
    });
  }
  return (
    <>
      {errorLogin && (
        <p className=" text-red-400 text-lg text-center p-2 bg-black m-1 rounded-md">
          {loginStatus}
        </p>
      )}

      <div className=" shadow-[0_0_20px_purple] flex justify-center flex-col p-4 rounded-lg m-0 bg-black w-5hundred h-3hundred font-mono ">
        <label className=" p-2 text-fuchsia-600  text-2xl">Username </label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="text"
        />
        <label className=" p-2 text-fuchsia-600 text-2xl ">Password </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
          type="password"
        />
        <button
          onClick={handleSubmit}
          className=" text-white hover:bg-fuchsia-400 p-2 w-[90px] h-[50px] bg-fuchsia-600 rounded-md m-3"
        >
          Login
        </button>
      </div>
      <div className=" flex items-center justify-between p-2 ">
        <p className=" drop-shadow-md text-white">Still haven't account? </p>
        <button
          disabled={isSubmiting}
          className="text-fuchsia-600 hover:text-white hover:bg-fuchsia-600 text-lg drop-shadow-md p-1  rounded-md bg-black m-1"
          onClick={handleIsLogin}
        >
          register now
        </button>
      </div>
    </>
  );
}

function RegisterForm() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  async function handleSubmit() {
    const response = await axios.post(
      "http://localhost:4000/users",
      {
        name: userName,
        password: password,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      const result = await signIn("credentials", {
        username: userName,
        password: password,
        redirect: true,
        callbackUrl: "/feed",
      });
    }
  }
  return (
    <form
      onSubmit={(e) => {
        handleSubmit();
        e.preventDefault();
      }}
      className=" shadow-[0_0_20px_purple] flex justify-center flex-col p-4 rounded-lg m-0 bg-black w-5hundred h-5hundred font-mono "
    >
      <label className=" p-2 text-fuchsia-600  text-2xl">Username </label>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="text"
      />
      <label className=" p-2 text-fuchsia-600  text-2xl">Email </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="email"
      />
      <label className=" p-2 text-fuchsia-600 text-2xl ">Password </label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className=" flex flex-start w-4hundred ml-2 mr-2 text-lg rounded-md p-2 text-fuchsia-800 font-bold outline-fuchsia-600"
        type="password"
      />
      <label className=" p-2 text-fuchsia-600 text-2xl ">
        confirm password
      </label>
      <input
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
    </form>
  );
}
