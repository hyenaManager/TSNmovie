import FollowAndVistPageSection from "./followSection";

import UserProfile from "./userProfile";
export default function Profile() {
  return (
    <>
      <main className=" pageWarper flex xsm:flex-col sm:flex-row xsm:w-full sm:h-[92vh] ">
        {/* user section */}
        <UserProfile />
        {/* follow and page section */}
        <FollowAndVistPageSection />
      </main>
    </>
  );
}
