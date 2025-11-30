import  { adminApi,  superApi, userApi } from "@/libs/axios";
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
  tokenName: 'user_token' | 'admin_token' | 'super_token',
  
): Promise<{ data: Place[]; error: string }> {
const token = getCookie(tokenName)
  if (token==='') {
    return {
      data: [],
      error: "no-token",
    };
  }
 
  let apiInstance;
  switch (tokenName) {
    case "user_token":
      apiInstance = userApi;
      break;
    case "admin_token":
      apiInstance = adminApi;
      break;
    case "super_token":
      apiInstance = superApi;
      break;

      default:
      throw new Error("Invalid token type");
    
    }
    console.log(apiInstance);
 if (!apiInstance || !apiInstance.get) {
  throw new Error("apiInstance is not a valid axios instance");
}
  try {
    
    const res = await apiInstance.get(`/places`, {
      params: { region_id: regionId },
      withCredentials: true,
      
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
