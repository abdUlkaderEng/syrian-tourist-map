import { userApi } from "./axios";
export interface Comment {
  comment_id: number;
  content: string;
  date: string;
  user_id: number;
  place_id: number;
  user: {
    id: number;
    name: string;
  };
}

export async function getComments(place_id: number): Promise<Comment[]> {
  try {
    const res = await userApi.get(`/getComments?place_id=${place_id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching Comments:", error);
    return [];
  }
}
