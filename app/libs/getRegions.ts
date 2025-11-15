import api from "./axios";

export interface Region {
  region_id: number;
  name: string;
  description: string;
}

export async function getRegions(): Promise<Region[]> {
  // try {
  //     const res = await fetch(`http://127.0.0.1:8000/region`);

  //     if (!res.ok) {
  //       throw new Error(`Failed to fetch region: ${res.status}`);
  //     }

  //     const data = await res.json();
  //     return data.places || data.data || [];
  //   } catch (error) {
  //     console.error("Error fetching places:", error);
  //     return [];
  //   }

  try {
    const res = await api.get(`api/region`);
    return res.data.regions || res.data.data || res.data || [];
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
}
