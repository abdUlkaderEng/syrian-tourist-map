"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReadMoreButton from "../../../Components/ReadMoreButton";
import { MapPinned, Star } from "lucide-react";
import { useToast } from "@/Components/Toast/useToast";
import { title } from "process";
import { useRouter } from "next/navigation";

interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
  google_map_url: string;
}

interface RegionsPageClientProps {
  places: {data:Place[],error:string};
}

export default function RegionsPageClient({ places }: RegionsPageClientProps) {
 const router = useRouter()
 
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const {showToast} = useToast()
  if(places.error === 'no-token'){

    showToast(
      {
        title:'لا يمكن الوصول للصفحة',
        description:'الرجاء تسجيل الدخول',
        type:'error'
      }
    )
    router.push('/login')

    return;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-1">
      {places?.data.map((place, index) => (
        <div
          key={index}
          className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] rounded-xl glass transition-all duration-300 flex flex-col">
          <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-xl">
            <Image
              width={400}
              height={200}
              src={"/assets/Images/RegionImage/دمشق.png"}
              alt={place.name}
              className="object-cover w-full h-full"
            />
          </figure>

          <div className="p-4 md:p-5 flex flex-col flex-1">
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

            <div className="mt-2 h-full">
              <span className="font-semibold">عنوان المكان:</span>
              <p>{place.location}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
              <div className="flex text-[#f9bc43] gap-0.5">
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </div>

              <Link
                href={place.google_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="   sm:w-auto text-[#f9bc43] hover:scale-110 transition duration-200">
                <MapPinned size={25} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
