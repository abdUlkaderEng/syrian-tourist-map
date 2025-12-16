import { userApi } from "./axios";

export async function searchPLaces(searchParams:string ): Promise<Comment|null> {
  try {
    const res = await userApi.get(`/places/search?keyword=${searchParams}&locale=${lang}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching Comments:", error);
    return null;
  }
}
