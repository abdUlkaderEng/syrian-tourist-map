export interface Region {
  region_id: number;
  name: string;
  description: string;
}

export async function getRegions(): Promise<Region[]> {
  try {
    const res = await fetch(`/region`);

    if (!res.ok) {
      throw new Error(`Failed to fetch region: ${res.status}`);
    }

    const data = await res.json();
    return data.places || data.data || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}
