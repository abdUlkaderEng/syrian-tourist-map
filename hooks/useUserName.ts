"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export function useUserName() {
  const [name, setName] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get username from cookies
    const stored = getCookie("user_name");
    if (stored) {
      setName(stored.toString());
    }
  }, []);

  // Only return name after component is mounted (avoid hydration mismatch)
  return mounted ? name : "";
}

// Utility function to store username in cookie
export function setUserNameCookie(name: string) {
  setCookie("user_name", name, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: "lax",
  });
}

// Utility function to clear username cookie
export function clearUserNameCookie() {
  deleteCookie("user_name");
}

// Utility function to store token in cookie
export function setTokenCookie(
  token: string,
  cookieName: string = "user_token"
) {
  setCookie(cookieName, token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: "lax",
  });
}

// Utility function to clear token cookie
export function clearTokenCookie(cookieName: string = "user_token") {
  deleteCookie(cookieName);
}
