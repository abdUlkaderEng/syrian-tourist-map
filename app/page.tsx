"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SyriaSahdowMap from "./Components/SyriaSahdowMap";
import { getRegions, Region } from "./libs/getRegions";
export default function Home() {
  const mapWidth = 550;
  const mapHeight = 550;
  // interface regionsState {
  //   id: number;
  //   name: string;
  //   arabicName: string;
  //   isHovered: boolean;
  // }

  // const regions: regionsState[] = [
  //   { id: 1, name: "Damascus", arabicName: "دمشق", isHovered: false },
  //   { id: 2, name: "Daraa", arabicName: "درعا", isHovered: false },
  //   { id: 3, name: "Aleppo", arabicName: "حلب", isHovered: false },
  //   { id: 4, name: "Homs", arabicName: "حمص", isHovered: false },
  //   { id: 5, name: "Hama", arabicName: "حماة", isHovered: false },
  //   { id: 6, name: "Latakia", arabicName: "اللاذقية", isHovered: false },
  //   { id: 7, name: "Tartus", arabicName: "طرطوس", isHovered: false },
  //   { id: 8, name: "Ref-Damascus", arabicName: "ريف دمشق", isHovered: false },
  //   { id: 9, name: "As-Suwayda", arabicName: "السويداء", isHovered: false },
  //   { id: 10, name: "Deir ez-Zor", arabicName: "دير الزور", isHovered: false },
  //   { id: 11, name: "Al-Hasakah", arabicName: "الحسكة", isHovered: false },
  //   { id: 12, name: "Al-Raqqah", arabicName: "الرقة", isHovered: false },
  //   { id: 13, name: "Idlib", arabicName: "إدلب", isHovered: false },
  //   { id: 14, name: "Quneitra", arabicName: "القنيطرة", isHovered: false },
  // ];

  // const regions =  fetch('http://http://127.0.0.1:8000/regions')
  //   .then((res) => res.json())
  //   .then((data) => {data.data})
  //   .catch((error) => {
  //     console.error("Error fetching regions:", error);
  //     return [];
  //   });
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
