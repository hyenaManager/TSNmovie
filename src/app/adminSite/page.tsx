import Image from "next/image";
import { getAllUsers } from "../../../prisma/users";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./deleteUser";

export default async function AdminSite() {
  const allUsers = await getAllUsers();
  return (
    <main className="text-fuchsia-500 text-4xl text-center h-[92vh]">
      <nav className="w-full flex justify-evenly items-center ">
        <div>users</div>
        <div>reports</div>
      </nav>
      <ul className=" w-full p-2 flex justify-start flex-col overflow-auto h-[81vh]">
        {allUsers.map((user, index: number) => (
          <li
            key={index}
            className=" w-[98%] text-sm text-fuchsia-700 p-1 m-1 grid grid-cols-3 items-center justify-between relative "
          >
            <div className="mainNoti w-full flex justify-start items-center ">
              <Image
                src={user.image}
                alt="noti"
                width={20}
                height={20}
                className="xsm:w-[20px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] rounded-full object-cover mr-1"
              />
              <p className=" p-1">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <DeleteUser
              userEmail={user.email as string}
              name={user.firstName + " " + user.lastName}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
