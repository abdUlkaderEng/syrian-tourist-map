"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  MapPin,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import UserName from "@/Components/UserName";
import { useAuthStore } from "@/hooks/Auth/authStore";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const username = useAuthStore(state => state.username);
  
  
  const t = useTranslations();

  return (
    <aside
      className={`h-full transition-all duration-200 galss ${
        open ? "w-64" : "w-20"
      }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#f9bc43] flex items-center justify-center text-black font-bold">
              {username ? username.charAt(0).toUpperCase() : "A"}
            </div>
            {open && (
              <div>
                <div className="text-sm font-semibold">{t("hello")}</div>
                <div className="text-xs text-gray-600">
                  <UserName label={t("profile.profile")} />
                </div>
              </div>
            )}
          </div>

          <button
            aria-label="Toggle sidebar"
            onClick={() => setOpen((s) => !s)}
            className="p-1 rounded-md ">
            {open ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                href={"/admin/SuperAdminDashboard/ManagePlacesPage"}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-[#E7A24A]">
                <MapPin />
                {open && (
                  <span className="font-medium">
                    {t ? t("admin.managePlaces") : "Manage Places"}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link
                href={["/admin/SuperAdminDashboard/AddPlace"].join("")}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-[#E7A24A]">
                <Users />
                {open && (
                  <span className="font-medium">
                    {t ? t("admin.manageUsers") : "Manage Users"}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link
                href={["/admin/SuperAdminDashboard/adminManagePage"].join("")}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-[#E7A24A]">
                <Settings />
                {open && (
                  <span className="font-medium">
                    {t ? t("admin.manageAdmins") : "Settings"}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
