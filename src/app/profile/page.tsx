"use client";
import { SessionProvider } from "next-auth/react";
import Bruh from "./testLogin";

export default async function UserPage() {
  return (
    <SessionProvider>
      <Bruh />
    </SessionProvider>
  );
}
