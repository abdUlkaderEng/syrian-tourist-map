"use client";

import { ToastProvider } from "@/Components/Toast/ToastProvider";
import { LocaleContextProvider } from "./LocaleContext";
import { LocaleProvider } from "./LocaleProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <LocaleContextProvider>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </LocaleContextProvider>
    </ToastProvider>
  );
}
