"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useSuperAdmin = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin"); 
    else
    setTimeout(() => setLoading(false), 0);
  }, [router]);

  return { loading };
};
