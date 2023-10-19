import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="fixed z-50 top-0 left-0 bg-white w-full h-full flex justify-center items-center">
      <section className=" flex flex-col items-center">
        <h2 className="text-4xl text-red-500">Not Found</h2>
        <p className=" text-black">Could not find requested resource</p>
        <div className="flex justify-between text-fuchsia-700 text-2xl items-center p-2">
          <Link href="/">Home</Link>
          <Link href="/clips">Clip</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </section>
    </main>
  );
}
