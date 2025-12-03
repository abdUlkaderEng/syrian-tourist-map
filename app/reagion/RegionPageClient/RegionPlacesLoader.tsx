"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/app/Providers/LocaleContext";
import { getPlaces, Place } from "@/libs/getPlaces";
import RegionsPageClient from "./RegionsPageClient";

interface LoaderProps {
  regionId: string;
}

export default function RegionPlacesLoader({ regionId }: LoaderProps) {
  const { locale } = useLocale();
  const [places, setPlaces] = useState<{ data: Place[]; error: string }>({
    data: [],
    error: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPlaces(regionId, "user", locale)
      .then((res) => setPlaces(res))
      .catch(() => setPlaces({ data: [], error: "fetching-error" }))
      .finally(() => setLoading(false));
  }, [regionId, locale]);

  if (loading) return <div className="text-center py-6">Loading...</div>;

  return <RegionsPageClient places={places} />;
}
