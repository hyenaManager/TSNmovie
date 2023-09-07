import Link from "next/link";
import Head from "./components/movieShow";

export default function Home() {
  return (
    <main className=" flex justify-center bg-black flex-col">
      <h2 className=" text-4xl text-center font-mono mt-14 text-fuchsia-600 p-3 divide-fuchsia-700 divide-x-2 capitalize">
        What we can offer you
      </h2>
      <hr className="border-t-2 border-fuchsia-500" />
      <Head />
      <button className=" hover:text-white ease-in-out transition text-xl max-w-fit rounded-md text-fuchsia-600 p-3 flex justify-end  m-3">
        <Link href={"/api/auth/signIn"}>Login Now</Link>
      </button>
    </main>
  );
}
