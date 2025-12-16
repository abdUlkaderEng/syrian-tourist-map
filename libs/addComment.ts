import { userApi } from "./axios";
import { Comment } from "./getComments";

export async function addComments(data:FormData ): Promise<Comment|null> {
  try {
    const res = await userApi.post(`/storeComments`,data);
    return res.data;
  } catch (error) {
    console.error("Error fetching Comments:", error);
    return null;
  }
}
