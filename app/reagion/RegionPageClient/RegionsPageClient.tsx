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

interface RegionsPageClientProps {
  places: { data: Place[]; error: string };
}

export default function RegionsPageClient({ places }: RegionsPageClientProps) {
  const router = useRouter();
  const t = useTranslations();
  const [commentsData, setCommentsData] = useState<Record<number, Comment[]>>(
    {}
  );
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

  const refreshComments = async (id: number) => {
    const comments = await getComments(id);
    console.log("Comments:", comments);
    setCommentsData((prev) => ({ ...prev, [id]: comments || [] }));
  };
  console.log(places);
  return (
    <div className="flex  flex-row flex-wrap justify-center gap-4 p-1">
      {places?.data.map((place, index) => (
        <div
          key={index}
          className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] rounded-xl glass transition-all duration-300 flex flex-col relative">
          <FlipCard
            key={place.id}
            front={(flip) => (
              <div>
                <figure className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-xl">
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
                  <h3 className="text-lg md:text-xl font-bold">{place.name}</h3>

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

                  <div className="mt-2 h-full">
                    <span className="font-semibold">
                      {t("place.placeLocation")}
                    </span>
                    <p>{place.location}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
                    <div className="flex text-[#f9bc43] gap-0.5">
                      <Star size={20} />
                      <Star size={20} />
                      <Star size={20} />
                      <Star size={20} />
                      <Star size={20} />
                    </div>
                    <Link
                      href={place.google_map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="   sm:w-auto text-[#f9bc43] hover:scale-110 transition duration-200">
                      <MapPinned size={25} />
                    </Link>
                    <button
                      className="sm:w-auto text-[#f9bc43] hover:scale-110 transition duration-200"
                      onClick={() => flip()}>
                      <MessageCircleMore />
                    </button>{" "}
                  </div>
                </div>
              </div>
            )}
            back={(flip) => (
              <BackPlaceCard
                targetId={place.id}
                onClose={flip}
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}
