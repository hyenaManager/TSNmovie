"use client";

import { useAdminCurrentData } from "../store";

export default function AdminNav() {
  const setNavigation = useAdminCurrentData((state) => state.setCurrentNav);

  return (
    <nav className="w-full flex justify-evenly items-center ">
      <button className="w-full" onClick={() => setNavigation("users")}>
        users
      </button>
      <button className="w-full" onClick={() => setNavigation("reports")}>
        reports
      </button>
    </nav>
  );
}
