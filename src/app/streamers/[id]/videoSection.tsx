import Link from "next/link";
import Image from "next/image";
import CatagoryNavbar from "./catagoryNav";
import { MovieSearchBar } from "@/app/components/searchBar";
import { Like } from "@/app/components/reactions";
const data = [
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 200, id: 0 },
  { name: "OnePiece", image: "/luffy.jpg", episode: 210, id: 1 },
  { name: "BlackClover", image: "/Maleficent.jpg", episode: 300, id: 2 },
  { name: "Haikyu", image: "/bb.png", episode: 280, id: 3 },
  { name: "bruh", image: "/aot.jpg", episode: 100, id: 4 },
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 150, id: 5 },
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 200, id: 0 },
  { name: "OnePiece", image: "/luffy.jpg", episode: 210, id: 1 },
  { name: "BlackClover", image: "/Maleficent.jpg", episode: 300, id: 2 },
  { name: "Haikyu", image: "/bb.png", episode: 280, id: 3 },
  { name: "bruh", image: "/aot.jpg", episode: 100, id: 4 },
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 150, id: 5 },
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 200, id: 0 },
  { name: "OnePiece", image: "/luffy.jpg", episode: 210, id: 1 },
  { name: "BlackClover", image: "/Maleficent.jpg", episode: 300, id: 2 },
  { name: "Haikyu", image: "/bb.png", episode: 280, id: 3 },
  { name: "bruh", image: "/aot.jpg", episode: 100, id: 4 },
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 150, id: 5 },
];
export default function VideoSection() {
  return (
    <section className=" flex flex-col items-center w-full bg-black ">
      <CatagoryNavbar />
      <div className=" w-full grid grid-cols-5 overflow-auto p-3 bg-white">
        {data.map(({ name, image, id }) => (
          <article
            className=" border-2 flex flex-col justify-center items-center text-xl p-1 text-fuchsia-600 font-bold "
            key={name}
          >
            <Image
              width={140}
              height={140}
              src={image}
              alt={image}
              className=" rounded-md bg-gray-400 "
            />

            {/* <div className=" flex fixed ">
              <Like />
            </div> */}

            <Link
              href={`/streamers/${id}/${name}`}
              className=" flex justify-center items-center"
            >
              <h3 className=" text-center">{name} </h3>
            </Link>
          </article>
        ))}
      </div>
      {/* <MovieSearchBar /> */}
    </section>
  );
}
