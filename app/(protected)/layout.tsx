"use client";

import { apiFetch } from "@/lib/functions/apiFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, []);

  async function authCheck() {
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/me";

    try {
      const result = await apiFetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!result.success) {
        router.push("/login");
        setIsChecking(false);
        return;
      }
    } catch (error) {
      console.log("Failed to fetch the user", error);
    } finally {
      setIsChecking(false);
    }
  }

  return <div>{isChecking ? "Loading..." : children}</div>;
}
