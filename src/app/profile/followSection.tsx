import Image from "next/image";
import Link from "next/link";
import {
  HalfSkeleton,
  NormalSkeleton,
  ProfileNavSkeleton,
} from "../skeletons/skeletonStreamer";
import UserPageProfile from "../streamers/pageLinkImage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOption";
import { NProgressLink } from "@/components/customLinks";

export default async function FollowAndVistPageSection() {
  const session = await getServerSession(authOptions);
  const user: any = await fetch(
    `https://yokeplay.vercel.app/api/users/${session?.user.email}`,
    { next: { tags: ["userPage"] } }
  ).then((res) => res.json());

  if (!user?.Page) {
    return (
      <section className=" sm:w-[70vw] bg-black xsm:w-[100vw] xsm:min-h-[70vh] sm:min-h-[92vh] flex flex-col justify-center items-center ">
        <div className=" flex flex-col justify-center items-center gap-3">
          <h2 className=" text-white text-xl sm:text-2xl">
            You still haven't your own page yet.
          </h2>
          <Link
            href={"/gettingStart"}
            className=" p-2 rounded-md uppercase bg-green-400 hover:bg-green-600 text-white text-lg sm:text-2xl px-3 max-w-fit"
          >
            create page
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className=" sm:w-[70vw] bg-black xsm:w-[100vw] xsm:min-h-[70vh] sm:min-h-[92vh] flex flex-col ">
      {!user?.Page ? (
        user?.Page === null ? (
          <Link
            href={"/gettingStart"}
            className=" p-1 rounded-md bg-green-400 hover:bg-green-600 text-white text-lg m-1 max-w-fit"
          >
            create page
          </Link>
        ) : (
          <ProfileNavSkeleton />
        )
      ) : (
        <nav className=" flex p-2 justify-between items-center border-b-2 bg-slate-800 border-fuchsia-500">
          <NProgressLink
            href={`profile/page`}
            className=" flex justify-center items-center"
          >
            <Image
              src={user?.Page?.image}
              width={100}
              height={100}
              className=" w-[50px] h-[50px] object-cover rounded-full"
              alt="page"
            />
            <h3 className=" text-center text-white text-lg p-2 uppercase">
              Visit your page
              <b className=" text-red-500">{user?.Page?.name}</b>
            </h3>
          </NProgressLink>
        </nav>
      )}
      {/* Following */}
      <div className="">
        <h2 className="text-2xl text-white p-1">Following</h2>
        <div className=" grid xsm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-2 ">
          {!user ? (
            <>
              <NormalSkeleton />
              <HalfSkeleton />
            </>
          ) : (
            user?.following?.map((followedPage: any) => (
              <UserPageProfile
                id={followedPage.id}
                name={followedPage.name}
                image={followedPage.image}
                key={followedPage.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
