"use client";
import api from "./axios";

export interface Translation {
  id: number;
  region_id: number;
  locale: "ar" | "en";
  name: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface RegionFromBackend {
  id: number;
  url: string;
  created_at: string;
  updated_at: string;
  translations: Translation[];
}

export interface Region {
  region_id: number;
  name: string;
  description: string;
  url?: string;
}

function getTranslationByLocale(
  translations: Translation[],
  locale: "ar" | "en"
): { name: string; description: string } {
  const translation = translations.find((t) => t.locale === locale);
  
  if (translation) {
    return {
      name: translation.name,
      description: translation.description,
    };
  }
  
  // Fallback to first translation if locale not found
  const fallback = translations[0];
  return {
    name: fallback?.name || "",
    description: fallback?.description || "",
  };
}

export async function getRegions(locale: "ar" | "en" = "ar"): Promise<Region[]> {
  try {
    const res = await api.get(`/region?lang=${locale}`);
    const data = res.data.regions || res.data.data || res.data || [];
    
    // Handle both old and new data formats
    if (Array.isArray(data) && data.length > 0) {
      // Check if it's the new format with translations
      if (data[0].translations && Array.isArray(data[0].translations)) {
        return data.map((item: RegionFromBackend) => {
          const { name, description } = getTranslationByLocale(
            item.translations,
            locale
          );
          return {
            region_id: item.id,
            name,
            description,
            url: item.url,
          };
        });
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
}

  

