import { superApi } from "./axios";
import { Place } from "./getPlaces";

export async function deletePlace(placeId: number): Promise<boolean> {
  try {
    await superApi.delete(`/deleteplace/${placeId}`);
    return true;
  } catch (error) {
    console.error("Error deleting place:", error);
    return false;
  }
}

export async function updatePlace(
  placeId: number,
  data: Partial<Place> | FormData
): Promise<Place | null> {
  const isForm = data instanceof FormData;
  try {
    // If data is FormData (contains file), let axios set the headers automatically
    return  await superApi.post(`/updateplace/${placeId}`, data, {
      headers: isForm
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating place:", error);
    return null;
  }
}

export async function addPlace(
  data: Partial<Place> | FormData
): Promise<Place | null> {
  const isForm = data instanceof FormData;

  try {
    return await superApi.post(`/storeplace`, data, {
      headers: isForm
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding place:", error);
    return null;
  }
}


