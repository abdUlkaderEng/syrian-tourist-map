"use client";

import { ReactNode } from "react";

interface FormContainerProps {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
}

export default function FormContainer({
  title,
  children,
  onSubmit,
  className = "",
}: FormContainerProps) {
  return (
    <div className="animate-enter min-h-[80%] flex items-center justify-center">
      <div
        className={` glass p-8 rounded-2xl w-full max-w-md shadow-xl space-y-6 ${className}`}>
        <form onSubmit={onSubmit} className="space-y-5">
          <h2 className="text-3xl font-bold text-center">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}
