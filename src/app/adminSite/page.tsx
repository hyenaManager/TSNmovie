import Image from "next/image";
import { getAllUsers } from "../../../prisma/users";
import DeleteUser from "./deleteUser";
import SuspendUser from "./suspendUser";
import AllUsers from "./userList";
import AdminNav from "./adminNav";
import MainData from "./mainData";

export default async function AdminSite() {
  return (
    <main className="text-fuchsia-500 text-4xl text-center h-[92vh]">
      <AdminNav />
      <MainData />
    </main>
  );
}
