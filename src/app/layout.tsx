import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import NavBar from "./components/navBars";
import AuthProvider from "./context/authProvider";
import QueryProvider from "./context/reactQeueryProvider";

const space_gro = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YokePlay",
  description: "Generated by create next app",
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
            <NavBar />
            <div className=" min-h-[100vh] bg-black">{children}</div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
