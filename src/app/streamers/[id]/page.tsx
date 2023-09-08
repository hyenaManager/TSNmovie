import AdminPage from "./adminPage";

import VideoSection from "./videoSection";

type routeParams = {
  id: number;
};

export default function ProfilePage({ params }: { params: routeParams }) {
  const id: number = params.id;
  return (
    <main className=" flex flex-col justify-center text-white ">
      <AdminPage />
      <VideoSection />
    </main>
  );
}
