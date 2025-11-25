"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SyriaSahdowMap from "./Components/SyriaSahdowMap";
import { getRegions, Region } from "./libs/getRegions";
export default function Home() {
  const mapWidth = 550;
  const mapHeight = 550;
 
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const handleMouseEnter = (regionId: number) => {
    setIsHovered((prev) => ({ ...prev, [regionId]: true }));
  };
  const handleMouseLeave = (regionId: number) => {
    setIsHovered((prev) => ({ ...prev, [regionId]: false }));
  };

  const [regions, setRegion] = useState<Region[]>([]);

  useEffect(() => {
    getRegions().then(setRegion);
  },[] );
  return (
    <main className="flex">
      {/* Interactive Map */}

      <SyriaSahdowMap />
      <div className="w-1/2 pl-[5%] h-screen  ">
        {regions.map((region) => (
          <Image
            key={region.region_id}
            className={
              isHovered[region.region_id]
                ? "  absolute z-10  transition-all duration-200 top-20 "
                : "absolute -z-10   transition-all duration-200  top-20"
            }
            src={`/assets/SVG/${region.name}.svg`}
            alt={region.name}
            width={mapWidth}
            height={mapHeight}
          />
        ))}

        <Image
          src={"/assets/SVG/Syria.svg"}
          className="z-0 absolute top-20 "
          alt="syria map"
          width={mapWidth}
          height={mapHeight}
        />
      </div>

      {/* //Header and Regions List */}
      <div className=" w-[50%] grid grid-cols-2 place-items-center gap-4  overflow-y-auto h-screen    ">
        <div className="col-span-2">
          <Image
            src={"/assets/SVG/Header.svg"}
            alt={""}
            width={600}
            height={400}
            className="h-screen"
          />
        </div>

        {/* // Background Shadows */}
        <Image
          width={"600"}
          height={"300"}
          className="  opacity-30 blur-lg    top-15 absolute -z-10"
          src={"/assets/SVG/RedMapBG.svg"}
          alt={""}
        />

        {/* // Regions List */}

        {regions.map((region) => (
          <Link
            onMouseEnter={(e) => handleMouseEnter(region.region_id)}
            onMouseLeave={(e) => handleMouseLeave(region.region_id)}
            className="flex flex-col items-center   hover:scale-105   transition-all duration-300 m-2  ease-in "
            href={`/reagions/${region.region_id}`}
            key={region.region_id}>
            <Image
              src={`/assets/Images/RegionImage/${region.name}.png`}
              alt={region.name}
              width="300"
              height="100"
              className="rounded-lg shadow-xl items-center  "
            />
            <h3 className=" font-bold text-xl py-2">
              {region.name}
            </h3>
            <div className="text-sm ">
            {region.description}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
