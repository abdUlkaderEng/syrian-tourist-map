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
    const res = await fetch(
      `http://127.0.0.1:8000/places?region_id=${regionId}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch places: ${res.status}`);
    }

    const data = await res.json();
    return data.places || data.data || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}
