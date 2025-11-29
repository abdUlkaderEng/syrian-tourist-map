"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

export function useAuthLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      Cookies.remove("token", { path: "/" });

      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
