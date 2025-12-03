"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export const useSuperAdmin = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("super_token");
    if (!token) router.push("/admin"); 
    else
    setTimeout(() => setLoading(false), 0);
  }, [router]);

  return { loading };
};
