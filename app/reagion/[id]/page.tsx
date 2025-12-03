import RegionPlacesLoader from "@/app/reagion/RegionPageClient/RegionPlacesLoader";

export default function RegionPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="animate-enter">
      <RegionPlacesLoader regionId={id} />
    </div>
  );
}
