import Link from "next/link";
import Image from "next/image";
import { CustomLink } from "./customLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { User } from "@prisma/client";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  const userInfo: User = await fetch(
    `https://yokeplay.vercel.app/api/users/${session?.user.email}`,
    { next: { tags: ["navUser"] }, cache: "no-store" }
  ).then((res) => res.json());

  return (
    <>
      <nav className="pageWarper h-[8vh] text-white bg-black z-40 flex justify-between bg-none items-center mainNav sticky right-0 left-0 top-0">
        <CustomLink href={"/"}>
          <Link href={"/"} className=" font-mono text-fuchsia-600 ml-3">
            <Image
              src={"/mycon.png"}
              alt="icon"
              width={100}
              height={100}
              className="w-[70px] h-[70px] "
            />
          </Link>
        </CustomLink>
        <CustomLink href={"/clips"}>
          <Link
            href={"/clips"}
            className={
              " p-1 mainNavLink flex sm:flex-row xsm:flex-col justify-center items-center"
            }
          >
            <Image
              src={"/svgs/clips.svg"}
              width={100}
              height={100}
              alt="clips"
              className="w-[30px] h-[30px]"
            />
            <h4 className=" xsm:hidden sm:flex">clips</h4>
          </Link>
        </CustomLink>
        <CustomLink href={"/notifications"}>
          <Link
            href={"/notifications"}
            className={
              " p-1 mainNavLink flex sm:flex-row xsm:flex-col items-center "
            }
          >
            <Image
              src={"/svgs/noti.svg"}
              width={100}
              height={100}
              alt="clips"
              className="w-[30px] h-[30px] "
            />
            <h4 className=" xsm:hidden sm:flex">notifications</h4>
          </Link>
        </CustomLink>

        <CustomLink href={"/streamers"}>
          <Link
            href={"/streamers"}
            className={
              " p-1 mainNavLink flex sm:flex-row xsm:flex-col items-center "
            }
          >
            <Image
              src={"/svgs/streamers.svg"}
              width={100}
              height={100}
              alt="clips"
              className="w-[30px] h-[30px] "
            />
            <h4 className=" xsm:hidden sm:flex">streamers</h4>
          </Link>
        </CustomLink>
        <CustomLink href={"/profile"}>
          <Link
            href={"/profile"}
            className=" flex justify-center p-1 mainNavLink item sm:flex-row xsm:flex-cols-center"
          >
            {userInfo ? (
              <>
                <span className=" text-fuchsia-400 xsm:hidden sm:block text-lg p-1">
                  {userInfo.firstName + " " + userInfo.lastName}
                </span>
                {userInfo.image && (
                  <Image
                    width={400}
                    height={400}
                    alt="haih"
                    src={`${userInfo.image as string}`}
                    className=" rounded-full bg-cover xsm:w-[27px] object-cover xsm:h-[27px] sm:w-[40px] sm:h-[40px] "
                  />
                )}
              </>
            ) : (
              <>
                {/* <Image
                width={400}
                height={400}
                alt="haih"
                src={"/defaultProfile.jpeg"}
                className=" rounded-full bg-cover xsm:w-[27px] object-cover xsm:h-[27px] sm:w-[40px] sm:h-[40px] "
              /> */}
              </>
            )}
          </Link>
        </CustomLink>
      </nav>
    </>
  );
}
