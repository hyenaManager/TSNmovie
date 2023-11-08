import Link from "next/link";
import Image from "next/image";
type pagesProps = {
  id: string;
  name: string;
  // adminId: string;
  // createAt: Date;
  // updateAt: Date;
  image: string;
};
export default function UserPageProfile({ id, name, image }: pagesProps) {
  return (
    <>
      <Link
        href={`/streamers/${id}`}
        className=" flex flex-col items-center text-xl relative xsm:min-h-[200px] sm:max-h-[200px]  lg:max-h-[260px]"
        key={JSON.stringify(id)}
      >
        <Image
          fill
          alt={name}
          src={image}
          sizes="(max-width:480px):50vw,(max-width:1020px):100vw"
          className=" rounded-xl object-cover bg-gray-400 shadow-[0_0_20px_purple] "
        />
        <div className="absolute bottom-0 w-full flex justify-center items-end  bg-fuchsia-700 rounded-b-lg border-2 border-fuchsia-700">
          <h2
            className="  xsm:text-sm sm:text-lg rounded-md align-bottom  text-white"
            style={{ textShadow: "2px 2px 8px black" }}
          >
            {name}
          </h2>
        </div>
      </Link>
    </>
  );
}
