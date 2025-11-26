"use client";
import UserName from "@/Components/UserName";
import { useSuperAdmin } from "@/libs/useSuperAdmin";
import { label } from "framer-motion/client";
import Link from "next/link";
import React from "react";

const SuperAdminDashBoard = () => {
  const { loading } = useSuperAdmin();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        <UserName storageKey={"SuperAdminUserName" }label={'إدارة مهام المشرف'} />
      </h1>
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/SuperAdminDashboard/ManagePlacesPage"
          className="bg-amber-300 text-amber-900 px-6 py-3 rounded shadow hover:bg-amber-400 transition w-fit">
          Manage Places
        </Link>
        {/* Add more dashboard links here */}
      </div>
    </div>
  );
};

export default SuperAdminDashBoard;
