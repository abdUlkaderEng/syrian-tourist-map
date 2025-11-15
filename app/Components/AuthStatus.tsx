"use client";
import { LogOut, LogIn } from "lucide-react";
import React from "react";
import { useAuth } from "../libs/useauth";
import Link from "next/link";
const AuthStatus = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className=" text-[#E7A24A]   hover:scale-120 hover:text-[#832411] transition-all duration-200   flex items-center justify-center">
          {user.name}
        </div>
      ) : (
        // <LogOut size={35} />
        <Link
          href={"/login"}
          className=" text-[#E7A24A]   hover:scale-120 hover:text-[#832411] transition-all duration-200   flex items-center justify-center">
          <LogIn size={35} />
        </Link>
      )}
    </>
  );
};

export default AuthStatus;
