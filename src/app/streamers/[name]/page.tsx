import AdminPage from "./adminPage";
import CatagoryNavbar from "./catagoryOfMovie";
import PageMovie from "./movieList";

type routeParams = {
  name: string;
};

export default function ProfilePage({ params }: { params: routeParams }) {
  const name: string = params.name;
  return (
    <div className="pageWarper flex flex-col justify-center text-white ">
      <AdminPage pageName={name} />
      <main className=" flex flex-col items-center w-full bg-black ">
        <CatagoryNavbar pageName={name} />
        <PageMovie pageName={name} />
        {/* <MovieSearchBar /> */}
      </main>
    </div>
  );
}
