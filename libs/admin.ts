import { superApi } from "./axios";
import { Admin } from "./getAdmins";
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
export async function addAdmin(data: FormData) {
  try {
    const res = await superApi.post<Admin>("/createadmin", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error: any) {
    console.error("Error adding admin:", error);
    return null;
  }
}

export async function deleteAdmin(id: number) {
  try {
    return await superApi.delete(`/deleteadmin/${id}`);
  } catch (error) {
    console.error("Error deleting admin:", error);
    return null;
  }
}
export async function deleteUser(id: number) {
  try {
    return await superApi.delete(`/deleteuser/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}



