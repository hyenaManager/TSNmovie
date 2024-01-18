import Link from "next/link";
import { AdminSiteButton, LogoutButton } from "./profileButtons";
import UserImage, { UserName } from "./profileUserImg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { CustomLink, NProgressLink } from "../customLinks";

export default async function UserProfileWidget() {
  const session = await getServerSession(authOptions);
  return (
    <div className="pageWarper xsm:pb-32 sm:pb-0 relative shadow-lg overflow-hidden xsm:w-[100vw] sm:w-[30vw] bg-white dark:bg-zinc-800">
      <header className="pageWarper bg-[#f8fafc] dark:bg-zinc-900 px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex justify-center items-center">
          <UserName session={session} />
        </div>
      </header>
      <div className="pageWarper px-6 py-4 space-y-4">
        <UserImage session={session} />
      </div>
      <footer className="pageWarper min-h-[20vh] flex flex-col items-center justify-center border border-t border-zinc-200 dark:border-zinc-700 bg-[#f8fafc] dark:bg-zinc-900 p-2 w-full">
        <nav className="flex gap-4 justify-center w-full">
          <Link href="#">
            <svg
              className=" h-5 w-5 text-zinc-500 dark:text-zinc-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#">
            <svg
              key="0"
              className=" h-5 w-5 text-zinc-500 dark:text-zinc-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span className="sr-only">face book</span>
          </Link>
          <Link href="#">
            <svg
              className=" h-5 w-5 text-zinc-500 dark:text-zinc-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="sr-only">GitHub</span>
          </Link>
        </nav>
        {/* <CustomLink>
          <Link
            href={"/profile/editUser"}
            className="pageWarper text-center bg-fuchsia-500 hover:bg-fuchsia-700 text-white mt-4 w-full rounded-md px-4 py-2"
          >
            Edit Profile
          </Link>
        </CustomLink> */}
        <NProgressLink
          href="/profile/editUser"
          text="Edit profile"
          className={
            "pageWarper text-center bg-fuchsia-500 hover:bg-fuchsia-700 text-white mt-4 w-full rounded-md px-4 py-2"
          }
        />
      </footer>

      <LogoutButton />

      <AdminSiteButton />
    </div>
  );
}
