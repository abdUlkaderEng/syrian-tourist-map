"use client";
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HomeLink = () => {
  const path = usePathname();
  return (
    <>
      {path === "/" ? (
        <div></div>
      ) : (
        <Link
          className="ml-5 p-1 rounded-lg text-[#E7A24A] hover:text-[#832411] hover:scale-105 hover:bg-transparent hover:backdrop-blur-3xl transition-all duration-200 flex items-center justify-center"
          href={"/"}>
          <House size={30} />
        </Link>
      )}
    </>
  );
};

export default HomeLink;
