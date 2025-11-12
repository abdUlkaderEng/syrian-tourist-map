"use client";
import { ShieldUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminLink = () => {
  const pathName = usePathname();
  return (
    <div>
      {pathName === "/login" || pathName === "/register" ? (
        <Link
          href={"/admin"}
          className="text-[#E7A24A] hover:text-[#832411] hover:cursor-pointer   hover:scale-120  transition-all duration-200   flex items-center justify-center">
          <ShieldUser size={35} />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminLink;
