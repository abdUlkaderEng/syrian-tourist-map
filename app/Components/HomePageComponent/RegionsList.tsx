"use client";
import Image from "next/image";
import Link from "next/link";
import { Region } from "@/libs/getRegions";
import { useTranslations } from "next-intl";

interface RegionsListProps {
  regions: Region[];
  onMouseEnter: (regionId: number) => void;
  onMouseLeave: (regionId: number) => void;
}

const RegionsList = ({
  regions,
  onMouseEnter,
  onMouseLeave,
}: RegionsListProps) => {
  const t = useTranslations();
  return (
    <div className="sm:w-full md:w-full lg:w-[50%] grid grid-cols-2 place-items-center gap-4 overflow-y-scroll h-[85vh]">
      {/* Header */}

      <Image
        src={t('headerUrl')}
        alt="Header"
        width={575}
        height={300}
        className="col-span-2 "
      />

      {/* Background shadow effect */}
      <Image
        width={600}
        height={300}
        className="opacity-30 top-15  blur-sm  absolute -z-10"
        src={"/assets/SVG/RedMapBG.svg"}
        alt="Background shadow"
      />

      {/* Regions cards */}
      {regions.map((region) => (
        <Link
          onMouseEnter={() => onMouseEnter(region.region_id)}
          onMouseLeave={() => onMouseLeave(region.region_id)}
          className="flex flex-col items-center hover:scale-105 transition-all duration-300 m-2 ease-in"
          href={`/reagion/${region.region_id}`}
          key={region.region_id}>
          <Image
            src={`/assets/Images/RegionImage/${region.region_id}.png`}
            alt={region.name}
            width="300"
            height="100"
            className="rounded-lg shadow-xl items-center"
          />
          <h3 className="font-bold text-xl py-2">{region.name}</h3>
          <div className="text-sm">{region.description}</div>
        </Link>
      ))}
    </div>
  );
};

export default RegionsList;
