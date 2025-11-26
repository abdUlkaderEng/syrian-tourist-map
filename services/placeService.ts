import { superApi } from "@/libs/axios";
import { Place } from "@/libs/getPlaces";

const endpoint = "/places";

async function remove(id: number): Promise<boolean> {
  try {
    await superApi.delete(`${endpoint}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting place:", error);
    return false;
  }
}

async function update(id: number, data: Partial<Place>): Promise<Place | null> {
  try {
    const res = await superApi.post(`${endpoint}/${id}`, data);
    return res.data.data;
  } catch (error) {
    console.error("Error updating place:", error);
    return null;
  }
}

async function create(data: Omit<Place, "id">): Promise<Place | null> {
  try {
    const res = await superApi.post(`${endpoint}`, data);
    return res.data.data;
  } catch (error) {
    console.error("Error adding place:", error);
    return null;
  }
}

export const placesService = {
  remove,
  update,
  create,
};
