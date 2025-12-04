import RegionPlacesLoader from "@/app/reagion/RegionPageClient/RegionPlacesLoader";

export default async function RegionPage({ params }: { params: { id: string } }) {
  const  { id } = await params;
  return (
    <div className="animate-enter">
      <RegionPlacesLoader regionId={id} />
    </div>
  );
}
