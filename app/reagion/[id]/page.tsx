import { getPlaces } from "@/libs/getPlaces";
import RegionsPageClient from "@/app/reagion/RegionPageClient/RegionsPageClient";
import { get_user_token } from "@/app/Components/NavBarComponents/LoginLogoutButton";
import { cookies } from "next/headers";
export default async function RegionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const token = (await cookies()).get('user_token')?.value || ''
  const places = await getPlaces(id,token);

  return (
    <div className="animate-enter">
      <RegionsPageClient places={places} />
    </div>
  );
}
