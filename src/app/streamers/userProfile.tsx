import Link from "next/link";

type NumberCome = {
  number: number;
};

export default function UserPageProfile({ number }: NumberCome) {
  return (
    <>
      <div
        className=" flex flex-col justify-center items-center text-xl p-5"
        key={JSON.stringify(number)}
      >
        <img src="/luffy.jpg" className=" rounded-full bg-gray-400 " />
        <Link href={`/streamers/${number}`}>
          <span>user {number} </span>
        </Link>
      </div>
    </>
  );
}
