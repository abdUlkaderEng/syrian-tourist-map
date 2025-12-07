import { superApi } from "./axios";
export interface User {
  user:{
    id: number;
    name:string
    email: string;
    }
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await superApi.get("/getusers");
    return res.data.user;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
