import { Session, getServerSession } from "next-auth";

export async function UserName({ session }: { session: Session | null }) {
  return (
    <h3 className=" xsm:text-lg sm:text-4xl font-semibold uppercase text-fuchsia-800">
      {session?.user.name}
    </h3>
  );
}

export default async function UserImage({
  session,
}: {
  session: Session | null;
}) {
  return (
    <>
      <div className="flex items-center z-20 justify-center relative">
        <img
          alt="User avatar"
          className="h-[70px] w-[70px] rounded-full object-cover"
          src={session?.user ? session?.user.image : "/defaultProfile.jpeg"}
        />
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {session?.user.bio ? session?.user.bio : " no bio "}
      </p>
      <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
        {session?.user ? session?.user.email : "....."}
      </p>
    </>
  );
}
