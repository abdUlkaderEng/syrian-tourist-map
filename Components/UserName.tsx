"use client";

import { useAuthStore } from "@/hooks/Auth/authStore";


interface StoredValueProps {
  label?: string;
  className?: string;
}

export default function UserName({
  label,
  className,
}: StoredValueProps) {
  const name = useAuthStore((state) => state.username);
  return (
    <div
      className={`flex items-center gap-2  font-medium px-3 py-1 rounded-lg ${className}`}>
      {label && (
        <span className="text-gray-500 whitespace-nowrap">{label}</span>
      )}

      <span className="text-gray-700 font-semibold">{name ?? ""}</span>
    </div>
  );
}
