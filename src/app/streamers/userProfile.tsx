import Link from "next/link";

type pageProp = {
  id: number;
  name: string;
  image: string;
};

export default function UserPageProfile({ id, name, image }: pageProp) {
  return (
    <>
      <div
        className=" flex flex-col items-center text-xl p-5"
        key={JSON.stringify(id)}
      >
        <img src={image} className=" rounded-full bg-gray-400 " />
        <Link href={`/streamers/${id}`}>
          <span> {name} </span>
        </Link>
      </div>
    </>
  );
}
