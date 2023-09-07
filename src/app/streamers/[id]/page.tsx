import {
  faBook,
  faCoins,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CatagoryNavbar from "./catagoryNav";
import { MovieSearchBar } from "../../components/searchBar";
const data = [
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 200, id: 0 },
  { name: "OnePiece", image: "/luffy.jpg", episode: 210, id: 1 },
  { name: "BlackClover", image: "/Maleficent.jpg", episode: 300, id: 2 },
  { name: "Haikyu", image: "/bb.png", episode: 280, id: 3 },
  { name: "bruh", image: "/aot.jpg", episode: 100, id: 4 },
  { name: "AttackOnTitan", image: "/aot.jpg", episode: 150, id: 5 },
];
type routeParams = {
  id: number;
};

export default function ProfilePage({ params }: { params: routeParams }) {
  const id: number = params.id;
  return (
    <main className=" flex justify-center text-white  ">
      <section className=" w-6hundred h-[100vh] bg-black flex flex-col items-center  ">
        {/* user profile */}
        <div
          className=" flex flex-col bg-no-repeat bg-cover justify-center items-center text-xl p-7 bg-slate-600 w-full mt-12"
          style={{ backgroundImage: "url(/bb.png)" }}
        >
          <img
            src="/luffy.jpg"
            className=" w-[130px] h-[130px] rounded-full bg-gray-400 "
          />

          <span className=" text-4xl font-bold font-mono text-fuchsia-800 backdrop-blur-sm rounded-md">
            user {id}
          </span>
        </div>
        {/* user's followers */}
        <div className=" text-2xl flex items-center p-2 bg-black w-full justify-center">
          <span className=" mr-2 font-mono text-white">Bounty : 1k</span>
          <FontAwesomeIcon
            icon={faCoins}
            className=" w-[34px] h-[34px] text-yellow-600 p-1"
          />
          <button className=" bg-fuchsia-500 hover:bg-fuchsia-600 p-1 rounded-md text-lg text-white">
            follow
          </button>
        </div>
        {/* user's rating */}
        <ul className=" flex flex-col p-2 w-full justify-center bg-fuchsia-500">
          <li className=" flex justify-between text-xl items-center p-2 w-full">
            <span className=" font-mono text-white">Rating : </span>
            <div className=" flex justify-center items-center">
              <span className=" text-yellow-200 text-2xl">4.5</span>
              <FontAwesomeIcon
                icon={faStar}
                className=" text-yellow-400 w-[29px] h-[29px]"
              />
              <FontAwesomeIcon
                icon={faStar}
                className=" text-yellow-400 w-[29px] h-[29px]"
              />
              <FontAwesomeIcon
                icon={faStar}
                className=" text-yellow-400 w-[29px] h-[29px]"
              />
              <FontAwesomeIcon
                icon={faStar}
                className=" text-yellow-400 w-[29px] h-[29px]"
              />
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                className=" text-yellow-400 w-[29px] h-[29px]"
              />
            </div>
          </li>
        </ul>
        {/* contact and social  */}
        <div className=" flex flex-col w-full text-xl p-3 bg-white h-full">
          <span className=" text-start p-2 font-mono text-2xl text-black">
            Contact
          </span>
          <div className=" flex justify-between ">
            <button className=" p-2 rounded-md bg-blue-600 hover:bg-blue-800 text-white m-1">
              Facebook
            </button>
            <button className=" p-2 rounded-md bg-sky-400 hover:bg-sky-600 text-white m-1">
              Twitter
            </button>
            <button className=" p-2 rounded-md bg-black hover:bg-slate-900 text-white m-1">
              Tiktok
            </button>
            <button className=" p-2 rounded-md bg-blue-700 hover:bg-blue-900 text-white m-1">
              Discord
            </button>
          </div>
        </div>
      </section>
      {/* available movies */}
      <div className=" flex flex-col items-center min-h-[100vh] pt-14 w-full bg-black relative">
        <CatagoryNavbar />
        <div className=" mt-12 w-full h-full grid grid-cols-5 max-h-[83vh] overflow-auto p-3 bg-white border border-black">
          {data.map(({ name, image, id }) => (
            <div
              className=" flex flex-col justify-center items-center text-xl p-5 text-fuchsia-600 font-bold"
              key={name}
            >
              <img
                src={image}
                className=" w-[130px] h-[130px] rounded-full bg-gray-400 "
              />
              <Link
                href={`/streamers/${id}/${name}`}
                className=" flex justify-center items-center"
              >
                <span className=" text-center">{name} </span>
              </Link>
            </div>
          ))}
        </div>
        <MovieSearchBar />
      </div>
    </main>
  );
}
