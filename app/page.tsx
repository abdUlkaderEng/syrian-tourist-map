"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const mapWidth = 550;
  const mapHeight = 550;
  interface regionsState {
    id: number;
    name: string;
    isHovered: boolean;
  }
  const regions: regionsState[] = [
    { id: 0, name: "Damascus", isHovered: false },
    { id: 1, name: "Ref-Damascus", isHovered: false },
    { id: 2, name: "Quneitra", isHovered: false },
    { id: 3, name: "Daraa", isHovered: false },
    { id: 4, name: "As-Suwayda", isHovered: false },
    { id: 5, name: "Homs", isHovered: false },
    { id: 6, name: "Deir ez-Zor", isHovered: false },
    { id: 7, name: "Al-Hasakah", isHovered: false },
    { id: 8, name: "Al-Raqqah", isHovered: false },
    { id: 9, name: "Aleppo", isHovered: false },
    { id: 10, name: "Idlib", isHovered: false },
    { id: 11, name: "Latakia", isHovered: false },
    { id: 12, name: "Tartus", isHovered: false },
    { id: 13, name: "Hama", isHovered: false },
  ];
  const [isHovered, setIsHovered] = useState<regionsState[]>(regions);
  const handleMouseEnter = (regionName: string) => {
    setIsHovered((region) =>
      region.map((r) => (r.name === regionName ? { ...r, isHovered: true } : r))
    );
  };
  const handleMouseLeave = (regionName: string) => {
    setIsHovered((region) =>
      region.map((r) =>
        r.name === regionName ? { ...r, isHovered: false } : r
      )
    );
  };
  return (
    <main className="flex py-4  ">
      <div className="w-1/2 pl-[5%] align-middle justify-center ">
        {regions.map((region) => (
          <Image
            key={region.id}
            className={
              isHovered[region.id].isHovered
                ? "visible  absolute z-10 transition-all duration-1000"
                : "absolute z-10 hidden transition-all duration-1000"
            }
            src={`/assets/SVG/${region.name}.svg`}
            alt={region.name}
            width={mapWidth}
            height={mapHeight}
          />
        ))}

        <Image
          src={"/assets/SVG/Syria.svg"}
          className="z-0 absolute "
          alt="syria map"
          width={mapWidth}
          height={mapHeight}
        />
      </div>
      <div className=" w-[50%] grid grid-cols-2 place-items-center gap-4  overflow-y-auto h-[80vh]    ">
        {regions.map((region) => (
          <div
            onMouseEnter={(e) => handleMouseEnter(region.name)}
            onMouseLeave={(e) => handleMouseLeave(region.name)}
            className="  hover:scale-105 transition-transform duration-300 m-2 "
            key={region.id}>
            <Image
              src={"/assets/Images/OmayadMosque.jpeg"}
              alt="OmayadMosque"
              width="200"
              height="100"
              className="rounded-lg shadow-xl  "
            />
            <div className="font-bold text-xl py-2">{region.name}</div>
            <div className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores temporibus inventore quas neque obcaecati alias,
              voluptas adipisci id error, ducimus sunt dicta iure distinctio
              esse, modi accusantium. Nesciunt maiores qui rem suscipit dolore
              similique inventore provident blanditiis minima! Eius, tempore.
              Inventore nihil nisi aliquam iste!
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
