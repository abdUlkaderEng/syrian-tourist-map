"use client";
import { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "info" | "confirm";

export type ToastOptions = {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const ToastContext = createContext<{
  showToast: (o: ToastOptions) => string;
  dismissToast: (id: string) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}
