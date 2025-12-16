import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  username: string | null;
  role: "user" | "admin" | "superadmin" ;
  id: number

  setAuth: (token: string, username: string, role: AuthState["role"],id:number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      role: undefined,
      id:NaN,

      setAuth: (token, username, role, id) =>
        set(() => ({
          token,
          username,
          role,
          id,
        })),

      clearAuth: () =>
        set(() => ({
          token: null,
          username: null,
          role: undefined,
          id:NaN
        })),
    }),
    {
      name: "auth-store",
    }
  )
);
