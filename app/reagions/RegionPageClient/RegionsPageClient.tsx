"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReadMoreButton from "../../../Components/ReadMoreButton";

interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
  google_map_url: string;
}

interface RegionsPageClientProps {
  places: Place[];
}

export default function RegionsPageClient({ places }: RegionsPageClientProps) {
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {places?.map((place, index) => (
        <div
          key={index}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-xl glass transition-all duration-300">
          <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-xl">
            <Image
              width={400}
              height={200}
              src={"/assets/Images/RegionImage/دمشق.png"}
              alt={place.name}
            />
          </figure>

          <div className="p-4 md:p-5">
            <h3 className="text-lg md:text-xl font-bold">{place.name}</h3>

            <div className="text-sm md:text-base mt-2">
              <span className="font-semibold">لمحة عن المكان:</span>
              <ReadMoreButton
                text={place.description}
                isExpanded={expandedCards[index] || false}
                onToggle={() => toggleExpand(index)}
                charLimit={100}
                expandText="اقرأ المزيد"
                collapseText="اقرأ أقل"
              />
            </div>

            <div className="mt-2">
              <span className="font-semibold">عنوان المكان:</span>
              <p>{place.location}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-2">
                <div className="rating rating-sm">Rating</div>
                <span className="text-sm text-base-content/70"></span>
              </div>

              <Link
                href={place.google_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-amber-50 border-0 text-[#8B3E2F] hover:scale-105 bg-amber-100 transition-all duration-100 backdrop-opacity-30 btn-sm w-full sm:w-auto">
                زيارة الموقع
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
