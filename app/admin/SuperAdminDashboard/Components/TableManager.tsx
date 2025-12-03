"use client";
import { Plus } from "lucide-react";
import { JSX } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => JSX.Element | string);
  className?: string;
}

interface Action<T> {
  icon: JSX.Element;
  onClick: (row: T) => void;
  variant?: "normal" | "danger" | "secondary";
  className?: string;
}

interface ReusableTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  addButton?: {
    text: string;
    onClick: () => void;
    variant?: "normal" | "secondary";
  };
}

export default function ReusableTable<T>({
  title,
  data,
  columns,
  actions,
  addButton,
}: ReusableTableProps<T>) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl mb-3 font-semibold text-gray-800">{title}</h1>

      <div className="overflow-hidden border glass">
        <table className="w-full text-center">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`p-4 ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
              {addButton && (
                <th className="p-4">
                  <button
                    onClick={addButton.onClick}
                    className={`btn-normal w-full text-sm shadow-none flex items-center justify-center`}
                  >
                    {addButton.text}
                    <Plus />
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-[#e4bc75]">
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={`p-4 text-gray-900 border-l border-[#e4bc75]`}
                  >
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as any)}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 flex gap-3 justify-end">
                    
                    
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.onClick(row)}
                        className={`btn-${action.variant}`}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
