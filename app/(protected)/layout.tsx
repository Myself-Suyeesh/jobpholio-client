"use client";

import { apiFetch } from "@/lib/functions/apiFetch";
import { UserProfile } from "@/lib/types/user-details";
import UserContext from "@/lib/utils/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, []);

  async function authCheck() {
    const url = "/auth/me";

    try {
      const result = await apiFetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!result.success) {
        router.push("/login");
        return;
      }

      setUserInfo(result.data.user);
    } catch (error) {
      console.log("Failed to fetch the user", error);
      router.push("/login");
    } finally {
      setIsChecking(false);
    }
  }

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return null;
  }

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
