"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { useAuthLogout } from "@/hooks/Auth/useAuthLogout";
import api from "@/libs/axios";
import UserName from "@/Components/UserName";
import { useAuthStore } from "@/hooks/Auth/authStore";
import { string } from "zod";

export default function LoginLogoutButton() {
  const { logout, loading } = useAuthLogout({
    apiInstance: api,
    redirectTo: "/",
  });

  const role = useAuthStore((state) => state.role) ;
if (!["admin", "superadmin", "user"].includes(role)) {

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
      <UserName className="text-sm text-gray-700" />
      <button
        onClick={async () => await logout()}
        disabled={loading}
        className="text-[#E7A24A] hover:scale-120 hover:text-[#832411] transition-all duration-200 flex items-center justify-center disabled:opacity-50">
        <LogOut size={30} />
      </button>
    </div>
  );
}
