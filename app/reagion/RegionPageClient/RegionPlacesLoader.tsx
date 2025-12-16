"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/app/Providers/LocaleContext";
import { getPlaces, Place } from "@/libs/getPlaces";
import RegionsPageClient from "./RegionsPageClient";
import { useAuthStore } from "@/hooks/Auth/authStore";

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
  const role = useAuthStore(state => state.role)
  useEffect(() => {
    setLoading(true);
    getPlaces( role, locale,regionId)
      .then((res) => setPlaces(res))
      .catch(() => setPlaces({ data: [], error: "fetching-error" }))
      .finally(() => setLoading(false));
  }, [regionId, locale,role]);

  if (loading) return <div className="text-center py-6">Loading...</div>;

  return <RegionsPageClient places={places} />;
}
