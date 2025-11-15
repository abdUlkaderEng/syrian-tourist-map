import api from "./axios";

export interface Place {
  id?: number;
  name: string;
  description: string;
  location: string;
  google_map_url: string;
  region_id: number;
}

export async function getPlaces(regionId: string): Promise<Place[]> {
  try {
    const res = await api.get(`/places`, {
      params: { region_id: regionId },
      withCredentials: true,
    });

    return res.data.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}
