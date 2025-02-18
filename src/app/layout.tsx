import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import NavBar from "../components/navBars";
import AuthProvider from "./context/authProvider";
import QueryProvider from "./context/reactQeueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "./context/userContext";
import { Toaster } from "react-hot-toast";
import CurrentUploading from "../components/currentLoadingProcess";
import { Suspense } from "react";
import { NavigationEvents } from "../components/routerEvent";

const space_gro = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YokePlay",
  description: "Generated by create next app",
  icons: "/yoke.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={space_gro.className}>
        <QueryProvider>
          <AuthProvider>
            <UserProvider>
              <NavBar />
              <CurrentUploading />
              <div className="pageWarper min-h-[92vh] bg-black first-letter:">
                {children}
              </div>
              <Toaster />
            </UserProvider>
          </AuthProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
