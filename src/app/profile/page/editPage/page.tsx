import ProfilePictureSection from "./editNamePictures";
import { ChangePageContact } from "./contactPart";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
export default function EditProfile() {
  return (
    <section className=" pageWarper z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center">
      <ProfilePictureSection />
      {/* contact list */}
      <ChangePageContact />
      <Link
        href={`/profile/page`}
        className=" p-3 text-white bg-yellow-300 hover:bg-yellow-600 rounded-md text-lg fixed top-2 right-2"
      >
        cancel
      </Link>
      <Toaster />
    </section>
  );
}
