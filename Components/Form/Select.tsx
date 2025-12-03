"use client";
import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label className="mb-1 block font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-3 input-base rounded-md ${className}`}
      >
        <option value="" disabled>
          
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
