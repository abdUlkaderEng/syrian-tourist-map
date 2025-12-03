"use client";
import { useEffect, useState } from "react";
import MapSection from "./Components/HomePageComponent/MapSection";
import RegionsList from "./Components/HomePageComponent/RegionsList";
import { getRegions, Region } from "../libs/getRegions";
import { useLocale } from "./Providers/LocaleContext";

export default function Home() {
  const { locale } = useLocale();
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const [regions, setRegion] = useState<Region[]>([]);

  const handleMouseEnter = (regionId: number) => {
    setIsHovered((prev) => ({ ...prev, [regionId]: true }));
  };

  const handleMouseLeave = (regionId: number) => {
    setIsHovered((prev) => ({ ...prev, [regionId]: false }));
  };

  useEffect(() => {
    getRegions(locale).then(setRegion);
  }, [locale]);

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
