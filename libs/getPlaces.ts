import { useRouter } from "next/router";
import api from "./axios";
import { getCookie } from "cookies-next";
export interface Place {
  place_id: number;
  name: string;
  description: string;
  location: string;
  google_map_url: string;
  region_id: number;
}

export async function getPlaces(
  regionId: string,
  tokenName: string
): Promise<{ data: Place[]; error: string }> {
const token = getCookie(tokenName)
  if (token==='') {
    return {
      data: [],
      error: "no-token",
    };
  }
  try {
    const res = await api.get(`/places`, {
      params: { region_id: regionId },
      withCredentials: true,
       headers: {
        Authorization: `Bearer ${token}`,
      },
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
