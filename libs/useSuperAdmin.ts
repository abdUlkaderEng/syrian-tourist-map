"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useAuth } from "./useauth";
import { useAuthStore } from "@/hooks/Auth/authStore";

export const useSuperAdmin = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = useAuthStore.getState().token;
    if (!token) router.push("/admin"); 
    else
    setTimeout(() => setLoading(false), 0);
  }, [router]);

  return { loading };
};
