import { Suspense } from "react";
import MainList from "./main";
import { Toaster } from "react-hot-toast";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";
import { EditProfileButton } from "@/app/components/floatingCreateBtn";

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
