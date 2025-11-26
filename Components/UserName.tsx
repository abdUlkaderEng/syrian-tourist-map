"use client";

interface StoredValueProps {
  storageKey: string;
  label?: string;
  className?: string;
}

export default function UserName({
  storageKey,
  label,
  className,
}: StoredValueProps) {
  const value =
    typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

  return (
    <div
      className={`flex items-center gap-2  font-medium px-3 py-1 rounded-lg ${className}`}>
      {label && (
        <span className="text-gray-500 whitespace-nowrap">{label}</span>
      )}

      <span className="text-gray-700 font-semibold">{value ?? ""}</span>
    </div>
  );
}
