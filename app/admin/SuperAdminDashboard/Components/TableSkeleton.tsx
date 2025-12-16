"use client";

import React from "react";

interface TableSkeletonProps {
  title?: boolean;
  columns: number;
  rows?: number;
  hasActions?: boolean;
  hasAddButton?: boolean;
}

export default function TableSkeleton({
  title = true,
  columns,
  rows = 5,
  hasActions = true,
  hasAddButton = true,
}: TableSkeletonProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      {title && <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>}

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={`header-${i}`} className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </th>
              ))}
              {hasAddButton && (
                <th className="p-4">
                  <div className="h-10 bg-gray-200 rounded-md w-24 mx-auto"></div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={`cell-${rowIndex}-${colIndex}`} className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </td>
                ))}
                {hasActions && (
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </div>
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
