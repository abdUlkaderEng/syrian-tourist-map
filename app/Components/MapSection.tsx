"use client";
import Image from "next/image";
import { Region } from "@/app/libs/getRegions";

interface MapSectionProps {
  regions: Region[];
  isHovered: { [key: number]: boolean };
}

const MapSection = ({ regions, isHovered }: MapSectionProps) => {
    const shadowHeight = '225'
    const shadowWidth = '560'
    const mapHeight = '275'
    const mapwidth = '550'
    return (
    <div className="w-1/2 justify-center  px-5  overflow-y-hidden  ">
      {/* shadow map */}
      <Image
        width={shadowWidth}
        height={shadowHeight}
        className="  opacity-50   absolute blur-xs -z-10 max-w-full h-auto "
        src={"/assets/SVG/MapBG.svg"}
        alt={""}
      />
      <Image
        width={shadowWidth}
        height={shadowHeight}
        className="  opacity-20  absolute -z-10 max-w-full h-auto"
        src={"/assets/SVG/MapBG.svg"}
        alt={""}
      />

      {/* Regional SVG overlays */}
      {regions.map((region) => (
        <Image
          key={region.region_id}
          className={
            isHovered[region.region_id]
              ? "absolute z-10 transition-all duration-200 max-w-full h-auto "
              : "absolute -z-10 transition-all duration-200 max-w-full h-auto "
          }
          src={`/assets/SVG/${region.name}.svg`}
          alt={region.name}
          width={mapwidth}
          height={mapHeight}
        />
      ))}

      {/* Base map */}
      <Image
        src={"/assets/SVG/Syria.svg"}
        className="z-0 absolute max-w-full h-auto "
        alt="syria map"
        width={mapwidth}
        height={mapHeight}
      />
    </div>
  );
};

export default MapSection;
