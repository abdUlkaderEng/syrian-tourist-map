"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/libs/axios"; // عدل المسار حسب مشروعك
import { useState } from "react";
import api from "@/libs/axios";

export function useAuthLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      // hit logout endpoint
    //   await api.post("/logout", {}, { withCredentials: true });

      // clear cookie manually
      Cookies.remove("token", { path: "/" });

      // عادةً الباك بيمسح الكوكي لحاله بس احتياط
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
