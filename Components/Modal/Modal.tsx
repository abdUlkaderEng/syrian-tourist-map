"use client";

import React, { ReactNode } from "react";
import FormContainer from "@/Components/Form/FormContainer";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  overflow?: boolean;
  className?: string;
}

export default function Modal({
  title,
  children,
  onClose,
  onSubmit,
  overflow = false,
  className = "",
}: ModalProps) {
  return (
    <div className={`fixed inset-0 bg-transparent backdrop-blur-lg z-50 p-4 ${className}`}>
      <FormContainer
        title={title}
        onSubmit={onSubmit ?? (() => {})}
        className={`${className} relative p-6 space-y-4`}
        overflow={overflow}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          aria-label="Close">
          <X size={24} />
        </button>

        {children}
      </FormContainer>
    </div>
  );
}
