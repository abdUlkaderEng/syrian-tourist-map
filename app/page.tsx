"use client";
import { useEffect, useState } from "react";
import MapSection from "./Components/MapSection";
import RegionsList from "./Components/RegionsList";
import { getRegions, Region } from "./libs/getRegions";

export default function Home() {
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const [regions, setRegion] = useState<Region[]>([]);

  const handleMouseEnter = (regionId: number) => {
    setIsHovered((prev) => ({ ...prev, [regionId]: true }));
  };

  const handleMouseLeave = (regionId: number) => {
    setIsHovered((prev) => ({ ...prev, [regionId]: false }));
  };

  useEffect(() => {
    getRegions().then(setRegion);
  }, []);

  return (
    <main className="flex overflow-hidden  ">
      <MapSection regions={regions} isHovered={isHovered} />
      <RegionsList
        regions={regions}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </main>
  );
}
