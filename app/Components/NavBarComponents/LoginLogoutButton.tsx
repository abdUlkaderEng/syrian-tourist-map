"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { getCookie,  deleteCookie } from "cookies-next";
import { getCookies } from "cookies-next";

export default function LoginLogoutButton() {
  const [hasToken, setHasToken] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token =
      getCookie("user_token") ||
      getCookie("admin_token") ||
      getCookie("super_token");

    const name =
      getCookie("user_name") ||
      getCookie("admin_name") ||
      getCookie("super_name") ||
      "";

    setHasToken(!!token);
    setUsername(name as string);
  }, []);

   const clearAllCookies = () => {
  const allCookies = getCookies() || {};
  Object.keys(allCookies).forEach((name) => deleteCookie(name));
};

  function logout() {
    clearAllCookies();
    setHasToken(false);
    setUsername("");
    router.push('/')
  }

  if (!hasToken) {
    return (
      <Link
        href={"/login"}
        className=" text-[#E7A24A] hover:scale-120 hover:text-[#832411] transition-all duration-200 flex items-center justify-center">
        <LogIn size={30} />
      </Link>
    );
  }

  return (
    <div className="flex items-center text-center">
      <span className="text-sm text-gray-700">{username}</span>
      <button
        onClick={logout}
        className=" text-[#E7A24A] hover:scale-120 hover:text-[#832411] transition-all duration-200 flex items-center justify-center">
        <LogOut size={30} />
      </button>
    </div>
  );
}
