"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const mapWidth = 550;
  const mapHeight = 550;
  interface regionsState {
    id: number;
    name: string;
    arabicName: string;
    isHovered: boolean;
  }
  const regions: regionsState[] = [
    { id: 0, name: "Damascus", arabicName: "دمشق", isHovered: false },
    { id: 1, name: "Ref-Damascus", arabicName: "ريف دمشق", isHovered: false },
    { id: 2, name: "Quneitra", arabicName: "القنيطرة", isHovered: false },
    { id: 3, name: "Daraa", arabicName: "درعا", isHovered: false },
    { id: 4, name: "As-Suwayda", arabicName: "السويداء", isHovered: false },
    { id: 5, name: "Homs", arabicName: "حمص", isHovered: false },
    { id: 6, name: "Deir ez-Zor", arabicName: "دير الزور", isHovered: false },
    { id: 7, name: "Al-Hasakah", arabicName: "الحسكة", isHovered: false },
    { id: 8, name: "Al-Raqqah", arabicName: "الرقة", isHovered: false },
    { id: 9, name: "Aleppo", arabicName: "حلب", isHovered: false },
    { id: 10, name: "Idlib", arabicName: "إدلب", isHovered: false },
    { id: 11, name: "Latakia", arabicName: "اللاذقية", isHovered: false },
    { id: 12, name: "Tartus", arabicName: "طرطوس", isHovered: false },
    { id: 13, name: "Hama", arabicName: "حماة", isHovered: false },
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
    <main className="flex   ">
      <div>
        <Image
          width={"600"}
          height={"300"}
          className=" opacity-50 top-15  absolute blur-xs -z-10  "
          src={"/assets/SVG/MapBG.svg"}
          alt={""}
        />
        <Image
          width={"600"}
          height={"300"}
          className="  opacity-20 top-15 absolute -z-10"
          src={"/assets/SVG/MapBG.svg"}
          alt={""}
        />
        <Image
          width={"600"}
          height={"300"}
          className="  opacity-30 blur-lg   left-12 top-13 absolute -z-10"
          src={"/assets/SVG/RedMapBG.svg"}
          alt={""}
        />
      </div>
      <div className="w-1/2 pl-[5%] h-screen  ">
        {regions.map((region) => (
          <Image
            key={region.id}
            className={
              isHovered[region.id].isHovered
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

        {regions.map((region) => (
          <Link
            onMouseEnter={(e) => handleMouseEnter(region.name)}
            onMouseLeave={(e) => handleMouseLeave(region.name)}
            className="flex flex-col items-center   hover:scale-105   transition-all duration-300 m-2  ease-in "
            href={`/reagions/${region.name}`}
            key={region.id}>
            <Image
              src={`/assets/Images/${region.name}.png`}
              alt="OmayadMosque"
              width="300"
              height="100"
              className="rounded-lg shadow-xl items-center  "
            />
            <h3 className="text-[#8B3E2F] font-bold text-xl py-2">
              {region.arabicName}
            </h3>
            <div className="text-sm text-[#3E3E3E]">
              عاصمة سوريا وأقدم عاصمة مأهولة في العالم، تجمع بين التاريخ العريق
              والحياة العصرية. تنبض أزقتها القديمة بروح الحضارات التي مرت بها
              منذ آلاف السنين، حيث الجامع الأموي والأسواق العتيقة مثل الحميدية
              وساروجة. تتناثر حولها الحدائق والمقاهي الدمشقية الأصيلة، التي تفوح
              منها رائحة الياسمين، رمز المدينة الدائم. دمشق هي مزيج رائع من
              الروح الشرقية والتاريخ الحي الذي لا يموت.
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
