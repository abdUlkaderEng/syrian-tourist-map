"use client";

import React from "react";

export default function RegionPageSkeleton() {
  // Create an array of 6 skeleton items to match the grid layout
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="animate-pulse">
      {/* Search Box Skeleton */}
      <div className="mb-6">
        <div className="h-12 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto"></div>
      </div>

      {/* Grid Layout */}
      <div className="flex flex-row flex-wrap justify-center gap-4 p-1">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] h-full">
            <div className="h-full bg-white rounded-xl shadow-md overflow-hidden">
              {/* Image Placeholder */}
              <div className="w-full h-48 md:h-56 lg:h-64 bg-gray-200"></div>

              {/* Content Placeholder */}
              <div className="p-4 md:p-5">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

                {/* Description */}
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>

                {/* Location */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
