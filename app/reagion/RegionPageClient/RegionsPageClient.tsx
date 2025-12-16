"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReadMoreButton from "../../../Components/ReadMoreButton";
import {
  MapPinned,
  MessageCircleDashed,
  MessageCircleMore,
  Star,
} from "lucide-react";
import { useToast } from "@/Components/Toast/useToast";
import { useRouter } from "next/navigation";
import { Place } from "@/libs/getPlaces";
import { useTranslations } from "next-intl";
import FlipCard from "@/Components/FlipCard";
import BackPlaceCard from "./BackPlaceCard";
import { Comment, getComments } from "@/libs/getComments";
import SearchBox from "@/Components/SearchComponent";

interface RegionsPageClientProps {
  places: { data: Place[]; error: string };
}

export default function RegionsPageClient({ places }: RegionsPageClientProps) {
  const router = useRouter();
  const t = useTranslations();
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const { showToast } = useToast();
  if (places.error === "no-token") {
    showToast({
      title: t("errorMessages.unauthorizedAccess"),
      description: t("errorMessages.pleaseSignin"),
      type: "error",
    });
    router.push("/login");

    return;
  }

  console.log(places);
  return (
    <div>
      <SearchBox />
      <div className="flex flex-row flex-wrap justify-center gap-4 p-1">
        {places?.data.map((place, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] h-full">
            <div className="h-full bg-amber-800 rounded-xl glass transition-all duration-300 overflow-hidden">
              <FlipCard
                className="h-full"
                key={place.id}
                front={(flip: () => void) => (
                  <div className="h-full flex flex-col">
                    <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-xl shrink-0">
                      <Image
                        width={400}
                        height={200}
                        src={`http://localhost:8000/storage/${place.image_url}`}
                        unoptimized
                        alt={place.name}
                        className="object-cover w-full h-full"
                      />
                    </figure>
                    <div className="p-4 md:p-5 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold line-clamp-2 min-h-12">
                          {place.name}
                        </h3>
                        <div className="text-sm md:text-base mt-2">
                          <span className="font-semibold">
                            {t("place.summaryPlace")}
                          </span>
                          <ReadMoreButton
                            text={place.description}
                            isExpanded={expandedCards[index] || false}
                            onToggle={() => toggleExpand(index)}
                            charLimit={100}
                            expandText={t("buttons.readMore")}
                            collapseText={t("buttons.readLess")}
                          />
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold">
                            {t("place.placeLocation")}
                          </span>
                          <p className="line-clamp-2">{place.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                        <div className="flex text-[#f9bc43] gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} />
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={place.google_map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f9bc43] hover:scale-110 transition duration-200 flex items-center justify-center w-8 h-8">
                            <MapPinned size={22} />
                          </Link>
                          <button
                            className="text-[#f9bc43] hover:scale-110 transition duration-200 flex items-center justify-center w-8 h-8"
                            onClick={flip}>
                            <MessageCircleMore size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                back={(flip: () => void) => (
                  <BackPlaceCard targetId={place.id} onClose={flip} />
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
