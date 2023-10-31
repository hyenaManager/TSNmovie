"use client";
import { useAdminCurrentData } from "../store";
import Reports from "./reports";
import AllUsers from "./userList";

export default function MainData() {
  const currentData = useAdminCurrentData((state) => state.currentData);
  console.log(currentData, "is current data");

  return (
    <section className=" w-[95vw] h-full ">
      {currentData === "users" ? <AllUsers /> : <Reports />}
    </section>
  );
}
