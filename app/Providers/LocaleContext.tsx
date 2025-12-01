"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LocaleContextType = {
  locale: "en" | "ar";
  setLocale: (locale: "en" | "ar") => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleContextProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<"en" | "ar">("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage or default to "ar"
    const savedLocale = localStorage.getItem("lang") as "en" | "ar" | null;
    const initialLocale = savedLocale || "ar";
    setLocaleState(initialLocale);
    document.documentElement.dir = initialLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initialLocale;
    setMounted(true);
  }, []);

  const setLocale = (newLocale: "en" | "ar") => {
    setLocaleState(newLocale);
    localStorage.setItem("lang", newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;

    // Fire-and-forget: persist to backend
    fetch("/api/user/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ locale: newLocale }),
    }).catch((e) => console.warn("Failed to persist locale", e));
  };

  if (!mounted) return null;

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleContextProvider");
  }
  return context;
}
