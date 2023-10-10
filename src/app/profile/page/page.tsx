import MainList from "./main";
import { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  return (
    <div className="pageWarper flex flex-col justify-center text-white ">
      <main className=" flex flex-col items-center w-full bg-black ">
        <MainList />
        {/* <MovieSearchBar /> */}
        <Toaster />
      </main>
    </div>
  );
}
