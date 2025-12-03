import { adminApi, superApi, userApi } from "@/libs/axios";
export interface Place {
  place_id: number;
  name: string;
  description: string;
  location: string;
  google_map_url: string;
  region_id: number;
  image_url: File;
  type: "historical" | "entertainment" | "service";
}

export async function getPlaces(
  regionId: string,
  apiType: "user" | "admin" | "super"
): Promise<{ data: Place[]; error: string }> {
  let apiInstance;
  switch (apiType) {
    case "user":
      apiInstance = userApi;
      break;
    case "admin":
      apiInstance = adminApi;
      break;
    case "super":
      apiInstance = superApi;
      break;
    default:
      throw new Error("Invalid API type");
  }
  try {
    const res = await apiInstance.get(`/places`, {
      params: { region_id: regionId },
    });
    return {
      data: res.data.data,
      error: "",
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    return { data: [], error: "fetching-error" };
  }
}
