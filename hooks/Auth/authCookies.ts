"use client";

import { getCookie, setCookie, deleteCookie } from "cookies-next";

export function getAuthItem(key: string) {
  return getCookie(key)?.toString() || "";
}

export function setAuthItem(key: string, value: string) {
  setCookie(key, value, {
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax",
  });
}

export function clearAuthItem(key: string) {
  deleteCookie(key);
}
