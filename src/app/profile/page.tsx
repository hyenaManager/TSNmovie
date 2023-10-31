import UserProfileWidget from "../components/profile/userProfileWidget";
import FollowAndVistPageSection from "./followSection";
export default function Profile() {
  return (
    <>
      <main className=" pageWarper flex xsm:flex-col sm:flex-row xsm:w-full sm:h-[92vh] ">
        {/* user section */}
        <UserProfileWidget />
        {/* follow and page section */}
        <FollowAndVistPageSection />
      </main>
    </>
  );
}
