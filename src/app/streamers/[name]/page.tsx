import AdminPage from "./adminPage";
import CatagoryNavbar from "./catagoryNav";
import PageMovie from "./movieSection";

type routeParams = {
  name: string;
};

export default function ProfilePage({ params }: { params: routeParams }) {
  const name: string = params.name;
  return (
    <div className="pageWarper flex flex-col justify-center text-white ">
      <AdminPage userName={name} />
      <main className=" flex flex-col items-center w-full bg-black ">
        <CatagoryNavbar />
        <PageMovie author={name} />
        {/* <MovieSearchBar /> */}
      </main>
    </div>
  );
}
