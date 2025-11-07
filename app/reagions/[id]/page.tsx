import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Place {
  name: string;
  description: string;
  location: string;
  google_map_url: string;
}
export default async function RegionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await  params;
  const places: Place[] = await fetch(`http://127.0.0.1:8000/places?region_id=${id}`)
    .then((res) => res.json())
    .then((data) => data.data)  
    .catch((error) => {
      console.error("Error fetching places:", error);
      return [];
    });
    {console.log(places)}
  return (
    
    <div  className="grid  justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <Image
                src={"/assets/SVG/Syria.svg"}
                className="-z-10 h-screen blur-xs fixed top-5 justify-items-center "
                alt="syria map"
                width={700}
                height={500}
              />
      {places?.map((place, index) => (
        <div
          key={index}
          className="bg-transparent backdrop-blur-sm  w-full max-w-sm md:max-w-md lg:max-w-lg  shadow-lg rounded-xl overflow-hidden transition-all hover:scale-105 hover:backdrop-blur-3xl duration-400">
          <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
            <Image width={400} height={200} src={`/assets/Images/Damascus.png`} alt={""} />
          </figure>

          <div className="p-4 md:p-5 h-auto">
            <h3 className="text-lg md:text-xl font-bold text-[#832411]">
              {place.name}
            </h3>
            <p className="text-sm md:text-base text-base-content/70 mt-2 line-clamp-3 ">
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
                className="btn border-amber-50 border-0  text-[#8B3E2F] hover:scale-105  bg-amber-100 transition-all duration-100 backdrop-opacity-30   btn-sm w-full    sm:w-auto">
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
