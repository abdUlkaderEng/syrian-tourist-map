"use client";
import React from "react";

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 4,
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label className="mb-1 block font-medium" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full p-3 input-base rounded-md ${className}`}
      />
    </div>
  );
};

export default Textarea;
