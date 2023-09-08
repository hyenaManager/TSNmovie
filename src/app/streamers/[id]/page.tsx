import Link from "next/link";
import CatagoryNavbar from "./catagoryNav";
import { MovieSearchBar } from "../../components/searchBar";
import AdminPage from "./adminPage";
import Image from "next/image";
import VideoSection from "./videoSection";

type routeParams = {
  id: number;
};

export default function ProfilePage({ params }: { params: routeParams }) {
  const id: number = params.id;
  return (
    <main className=" flex justify-center text-white relative">
      <AdminPage />
      {/* available movies */}
      <VideoSection />
    </main>
  );
}
