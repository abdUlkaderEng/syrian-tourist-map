"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  loading = false,
  fullWidth = true,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "w-full btn-login active-tap text-lg font-semibold flex items-center justify-center";

  const variants = {
    primary: "bg-[#f9bc43] text-black hover:bg-[#ffc958]",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${loading ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? (
        <Loader2 className=" w-5 h-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
