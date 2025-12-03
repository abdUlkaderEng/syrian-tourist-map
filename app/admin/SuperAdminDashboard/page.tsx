"use client";
import UserName from "@/Components/UserName";
import { useSuperAdmin } from "@/libs/useSuperAdmin";
import { label } from "framer-motion/client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const SuperAdminDashBoard = () => {
  const { loading } = useSuperAdmin();
  const t = useTranslations()
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        <UserName userKey={"super_name"} label={t('welcomes.adminDashboard')} />
      </h1>
    </div>
  );
};

export default SuperAdminDashBoard;
