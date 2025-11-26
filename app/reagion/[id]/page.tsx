import React from "react";
import { getPlaces } from "@/libs/getPlaces";
import RegionsPageClient from "@/app/reagion/RegionPageClient/RegionsPageClient";

export default async function RegionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const places = await getPlaces(id);

  return (
    <div className="animate-enter">
      <RegionsPageClient places={places} />
    </div>
  );
}
