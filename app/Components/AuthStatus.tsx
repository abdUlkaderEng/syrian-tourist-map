"use client";
import { LogOut, LogIn } from "lucide-react";
import { useAuth } from "../libs/useauth";
import Link from "next/link";
const AuthStatus = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className="text-[#E7A24A]   hover:scale-120 hover:text-[#832411] transition-all duration-200   flex items-center justify-center">
          <LogOut size={35} />
          {user.name}
        </div>
      ) : (
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
