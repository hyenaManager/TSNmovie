import CatagoryNav from "./catagoryNav";
import MovieList from "./movieList";
import Profile from "./profile";

type routeParams = {
  name: string;
};

export default function ProfilePage() {
  return (
    <div className="pageWarper flex flex-col justify-center text-white ">
      <Profile />
      <main className=" flex flex-col items-center w-full bg-black ">
        <CatagoryNav />
        <MovieList />
        {/* <MovieSearchBar /> */}
      </main>
    </div>
  );
}
