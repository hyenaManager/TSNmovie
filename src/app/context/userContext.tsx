"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext } from "react";

export const userProvider = createContext(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, status } = useQuery({
    queryKey: ["user", session?.user.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://yokeplay.vercel.app/api/users/${session?.user.email}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
  const userData: any = { user: data, userPage: data?.Page };
  return (
    <userProvider.Provider value={userData}>{children}</userProvider.Provider>
  );
}
