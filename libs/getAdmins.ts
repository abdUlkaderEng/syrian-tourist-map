import { superApi } from "./axios";
export interface Admin {
  admin:{
    admin_id: number;
    super_admin_id: number;
    username: string;
    created_at: string;
    updated_at: string;

  }
}

export async function getAdmins(): Promise<Admin[]> {
  try {
    const res = await superApi.get("/getadmin");
    return res.data.admin;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
}
