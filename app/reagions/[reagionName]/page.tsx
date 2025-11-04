import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Place {
  name: string;
  description: string;
  type: string;
  google_map_url: string;
}
export default async function RegionPage({
  params,
}: {
  params: { reagionName: string };
}) {
  const { reagionName } = await params;
  // const places: Place[] = await fetch(`http://localhost:3000/api/places?region=${reagionName}`)
  const places: Place[] = [
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
    {
      name: reagionName,
      description: `Description of ${reagionName}`,
      type: "historical",
      google_map_url: "https://maps.google.com/?q=Place+1",
    },
  ];
  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {places.map((place, index) => (
        <div
          key={index}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-base-100 shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105">
          <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
            <Image width={400} height={200} src={`/assets/Images/${place.name}.png`} alt={""} />
          </figure>

          <div className="p-4 md:p-5">
            <h3 className="text-lg md:text-xl font-semibold text-base-content">
              {place.name}
            </h3>
            <p className="text-sm md:text-base text-base-content/70 mt-2 line-clamp-3">
              {place.description}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="rating rating-sm">Rating</div>
                <span className="text-sm text-base-content/70"></span>
              </div>

              <Link
                href={place.google_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm w-full sm:w-auto">
                زيارة الموقع
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    // <div style={{ fontSize: "24px", padding: "20px" }}>
    //   Welcom to {reagionName}
    // </div>
  );
}
