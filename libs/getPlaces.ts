import { adminApi, superApi, userApi } from "@/libs/axios";
import { ca } from "zod/v4/locales";

export interface Translation {
  id: number;
  place_id?: number;
  locale: "ar" | "en";
  name: string;
  description: string;
  location?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PlaceFromBackend {
  id: number;
  region_id: number;
  google_map_url: string;
  image_url: string | null;
  type: string;
  created_at: string;
  updated_at: string;
  region?: {
    id: number;
    url?: string;
    created_at?: string;
    updated_at?: string;
  };
  translations: Translation[];
}

export interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
  google_map_url: string;
  region_id: number;
  image_url?: string | null;
  type: "historical" | "entertainment" | "service" | string;
}

function getTranslationByLocale(
  translations: Translation[],
  locale: "ar" | "en"
): { name: string; description: string; location: string } {
  const translation = translations.find((t) => t.locale === locale);
  if (translation) {
    return {
      name: translation.name,
      description: translation.description,
      location: translation.location || "",
    };
  }
  const fallback = translations[0];
  return {
    name: fallback?.name || "",
    description: fallback?.description || "",
    location: fallback?.location || "",
  };
}

export async function getPlaces(
  apiType: "user" | "admin" | "superadmin",
  locale: "ar" | "en" = "ar",
  regionId?: string | number,
): Promise<{ data: Place[]; error: string }> {
  let apiInstance;
  switch (apiType) {
    case "user":
      apiInstance = userApi;
      break;
    case "admin":
      apiInstance = adminApi;
      break;
    case "superadmin":
      apiInstance = superApi;
      break;
    default:
      throw new Error("Invalid API type");
  }
  try {
    const params: Record<string, any> = { lang: locale };
    // Ensure region id is a valid number before sending it to the backend
    if (
      regionId !== undefined &&
      regionId !== null &&
      String(regionId).trim() !== ""
    ) {
      const regionNum = Number(regionId);
      if (!Number.isNaN(regionNum)) params.region_id = regionNum;
    }

    const res = await apiInstance.get(`/places`, { params });

    const raw = res.data.data || res.data || [];

    if (Array.isArray(raw) && raw.length > 0 && raw[0].translations) {
      const mapped: Place[] = raw.map((p: PlaceFromBackend) => {
        const { name, description, location } = getTranslationByLocale(
          p.translations,
          locale
        );
        return {
          place_id: p.id,
          name,
          description,
          location,
          google_map_url: p.google_map_url,
          region_id: p.region_id,
          image_url: p.image_url,
          type: p.type,
        };
      });

      return { data: mapped, error: "" };
    }

    // Fallback if backend already returns flattened data
    return {
      data: raw,
      error: "",
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    return { data: [], error: "fetching-error" };
  }
}



export async function getManagingPlaces(): Promise<PlaceFromBackend[]> {
  try {
    const res = await superApi.get("/getplaces");

    if (!Array.isArray(res.data.places)) {
      console.warn("API did not return array:", res.data);
      return [];
    }

    return res.data.places;
  } catch (err) {
    console.error("Failed to fetch places:", err);
    return [];
  }
}


