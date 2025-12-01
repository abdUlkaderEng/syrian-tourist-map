"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { getCookie } from "cookies-next";
import { useAuthLogout } from "@/hooks/Auth/useAuthLogout";
import { useUserName, clearUserNameCookie } from "@/hooks/useUserName";
import api from "@/libs/axios";

export default function LoginLogoutButton() {
  const [hasToken, setHasToken] = useState(false);
  const [mounted, setMounted] = useState(false);
  const username = useUserName();

  const { logout, loading } = useAuthLogout({
    apiInstance: api,
    redirectTo: "/",
  });

  useEffect(() => {
    setMounted(true);

    // Check if token exists in cookies
    const token =
      getCookie("user_token") ||
      getCookie("admin_token") ||
      getCookie("super_token");

    console.log("Token found:", !!token, "Username:", username);

    setHasToken(!!token);
  }, [username]);

  const handleLogout = async () => {
    clearUserNameCookie();
    await logout();
    setHasToken(false)
  };

  // Avoid hydration mismatch
  if (!mounted) return null;

  if (!hasToken) {
    return (
      <Link
        href={"/login"}
        className="text-[#E7A24A] hover:scale-120 hover:text-[#832411] transition-all duration-200 flex items-center justify-center">
        <LogIn size={30} />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">{username}</span>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="text-[#E7A24A] hover:scale-120 hover:text-[#832411] transition-all duration-200 flex items-center justify-center disabled:opacity-50">
        <LogOut size={30} />
      </button>
    </div>
  );
}
