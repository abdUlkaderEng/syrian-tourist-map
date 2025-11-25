"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useSuperAdmin = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log(token)
    if (!token) router.push("/admin"); // إذا ما فيه توكن رجعه على صفحة تسجيل الدخول
    else
    setTimeout(() => setLoading(false), 0);
  }, [router]);

  return { loading };
};
