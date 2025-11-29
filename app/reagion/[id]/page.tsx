import { getPlaces } from "@/libs/getPlaces";
import RegionsPageClient from "@/app/reagion/RegionPageClient/RegionsPageClient";
import { cookies } from "next/headers";
export default async function RegionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const user_token = (await cookies()).get('user_token')?.value 
  const super_token = (await cookies()).get('super_token')?.value 
  const places = await getPlaces(id,user_token || super_token || '');

  return (
    <div className="animate-enter">
      <RegionsPageClient places={places} />
    </div>
  );
}
