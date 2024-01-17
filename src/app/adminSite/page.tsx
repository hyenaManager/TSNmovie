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
