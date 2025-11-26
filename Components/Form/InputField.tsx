"use client";

import { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function InputField({ label, error, type, ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const finalType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && <label className="mb-1 block font-medium">{label}</label>}

      <div className="relative">
        <input
          type={finalType}
          {...props}
          className={`w-full p-3 pr-10 input-base ${props.className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f9bc43b4] transition-colors"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
