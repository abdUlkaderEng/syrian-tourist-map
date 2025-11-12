import api from "./axios";

export interface Region {
  region_id: number;
  name: string;
  description: string;
}

export async function getRegions(): Promise<Region[]> {
  try {
    const res = await api.get(`/region`);
    return res.data.regions || res.data.data || res.data || [];
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
}
