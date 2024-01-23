import { NProgressLink } from "@/components/customLinks";
import React from "react";

export default function Denied() {
  return (
    <main className=" w-full h-full text-2xl text-white  flex justify-center flex-col gap-y-2 items-center">
      <h4 className="text-red-600 text-4xl">Access denied</h4>
      <NProgressLink href={"/"}>
        <p>Please back to home</p>
      </NProgressLink>
    </main>
  );
}
