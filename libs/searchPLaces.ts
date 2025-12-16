import { userApi } from "./axios";
import { PlaceFromBackend } from "@/libs/getPlaces";

export async function searchPlaces(
  keyword: string,
  lang: string
): Promise<PlaceFromBackend[]> {
  try {
    const res = await userApi.get(
      `/places/search?keyword=${keyword}&locale=${lang}`,
      
    );
    return res.data.data;
  } catch (error) {
    console.error("Error searching places:", error);
    return [];
  }
}
