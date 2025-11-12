import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getPlaces } from "@/app/libs/getPlaces";
import SyriaMapBG from "@/app/Components/SyriaMapBG";
import image from '@/public/assets/Images/Damascus.png';

export default async function RegionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const places = await getPlaces(id);
  
  return (
    <div className="animate-enter">
      <SyriaMapBG />
      <div className=" grid  justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 ">
        {places?.map((place, index) => (
          <div
            key={index}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg  shadow-xl rounded-xl  glass  glass:hover  transition-all duration-300  hover:shadow-2xl ">
            <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
              <Image
                width={400}
                height={200}
                src={'/assets/Images/RegionImage/دمشق.png'}
                alt={place.name}
              />
            </figure>

            <div className="p-4 md:p-5 h-auto">
              <h3 className="text-lg md:text-xl font-bold ">{place.name}</h3>
              <div className="text-sm md:text-base  mt-2 line-clamp-3 ">
                {place.description}
              </div>
              <div>{place.location}</div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="rating rating-sm">Rating</div>
                  <span className="text-sm text-base-content/70"></span>
                </div>

                <Link
                  href={place.google_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border-amber-50 border-0  text-[#8B3E2F] hover:scale-105  bg-amber-100 transition-all duration-100 backdrop-opacity-30   btn-sm w-full    sm:w-auto">
                  زيارة الموقع
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
