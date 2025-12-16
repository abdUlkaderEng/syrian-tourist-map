"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/app/Providers/LocaleContext";
import { PlaceFromBackend } from "@/libs/getPlaces";
import {  Loader, Search, SplineIcon } from "lucide-react";
import Modal from "./Modal/Modal";
import { searchPlaces } from "@/libs/searchPLaces";
import Link from "next/link";
import Image from "next/image";
import InputField from "./Form/InputField";

export default function SearchBox() {
  const { locale } = useLocale();
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<PlaceFromBackend[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (!value.trim()) {
      setIsOpen(false);
      setResults([]);
      return;
    }

    setIsOpen(true);
    setLoading(true);

    const data = await searchPlaces(value, locale);
    setResults(data);

    setLoading(false);
  };

  return (
    <div className="relative">
        <InputField
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="ابحث عن مكان..."
          className=""
        />
        

      {isOpen && (
        <Modal
          title="نتائج البحث"
          onClose={() => {
            setIsOpen(false);
            setKeyword("");
            setResults([]);
          }}
          overflow
          className="max-h-[60vh] ">
          {loading && <Loader />}

          {!loading && results.length === 0 && (
            <p className="text-center opacity-60">ما في نتائج</p>
          )}

          <div className="space-y-3">
            {results.map((place) => (
              <Link
                key={place.id}
                href={place.google_map_url}
                target="_blank"
                onClick={() => {
                  setIsOpen(false);
                  setKeyword("");
                }}
                className="
                  flex items-center gap-3
    p-3 rounded-xl 
    hover:bg-gray-50 border-[#f9bb47]
    transition cursor-pointer
                ">
                     <div className="
    w-14 h-14
    rounded-lg
    bg-gray-200
    overflow-hidden
    shrink-0
  ">
    {place.image_url ? (
      <Image
      width={12}
      height={12}
      
        src={`http://localhost:8000/storage/${place.image_url}`}
        alt=''
        unoptimized
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-xs opacity-50">
        No Image
      </div>
    )}
  </div>
                <h3 className="font-semibold text-base  leading-tight">
                  {place.translations.find((t) => t.locale === locale)?.name}
                </h3>
                <p className="text-sm text-gray-500 ">
                  {
                    place.translations.find((t) => t.locale === locale)
                      ?.location
                  }
                </p>
              </Link>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
