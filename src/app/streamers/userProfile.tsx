import Link from "next/link";
import Image from "next/image";

type pageProp = {
  id: number;
  name: string;
  image: string;
};

export default function UserPageProfile({ id, name, image }: pageProp) {
  return (
    <>
      <article
        className=" flex flex-col items-center text-xl p-5"
        key={JSON.stringify(id)}
      >
        <Image
          width={240}
          height={240}
          alt={name}
          src={image}
          className=" w-[240px] h-[240px] rounded-full bg-gray-400 shadow-[0_0_20px_purple] "
        />
        <Link href={`/streamers/${name}`}>
          <h2> {name} </h2>
        </Link>
      </article>
    </>
  );
}
