import { superApi } from "./axios";
import { Place } from "./getPlaces";

export async function deletePlace(placeId: number): Promise<boolean> {
  try {
    await superApi.post(`/deleteplace/${placeId}`);
    return true;
  } catch (error) {
    console.error("Error deleting place:", error);
    return false;
  }
}

export async function updatePlace(
  placeId: number,
  data: Partial<Place>
): Promise<Place | null> {
  try {
    const res = await superApi.post(`/updateplace/${placeId}`, data);
    return res.data.data;
  } catch (error) {
    console.error("Error updating place:", error);
    return null;
  }
}

export async function addPlace(data: Omit<Place, "id">): Promise<Place | null> {
  try {
    const res = await superApi.post(`/storeplace`, data);
    return res.data.data;
  } catch (error) {
    console.error("Error adding place:", error);
    return null;
  }
}
