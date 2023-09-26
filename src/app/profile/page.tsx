import { faEdit, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { UserPageProfile } from "../components/image";
import FollowAndVistPageSection from "./followSection";
export default function Profile() {
  return (
    <>
      <main className=" pageWarper flex h-[100vh] ">
        {/* user section */}
        <section className=" w-[30vw] bg-fuchsia-600 h-[100vh] flex flex-col justify-center relative items-center">
          <div className=" relative flex p-2 justify-center items-center">
            <Image
              src={"/hat.png"}
              alt="profile"
              width={100}
              height={100}
              className=" bg-cover rounded-full"
            />
            <FontAwesomeIcon
              icon={faEdit}
              title="upload photo"
              className=" absolute top-0 right-0 cursor-pointer w-[20px] h-[20px] text-white"
            />
          </div>
          <h2 className=" text-4xl p-1 rounded-full m-1 text-slate-800 text-center">
            Ling Kee
          </h2>
          <div className=" text-2xl bg-white p-3 rounded-full m-1 flex justify-center items-center text-fuchsia-800 text-center">
            <h2>mesutkee@gmail.com</h2>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="  text-blue-500 w-[30px] h-[30px]"
            />
          </div>
          <h2 className=" text-2xl bg-white p-3 rounded-full m-1 text-fuchsia-800 text-center">
            No address
          </h2>
          <button className=" text-xl pl-4 pr-4 p-2 text-white bg-slate-500 hover:bg-slate-800 rounded-lg absolute bottom-3 right-3">
            Edit
          </button>
        </section>
        {/* follow and page section */}
        <FollowAndVistPageSection />
      </main>
    </>
  );
}
