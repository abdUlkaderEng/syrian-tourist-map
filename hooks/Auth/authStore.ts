// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthState {
//   token: string | null;
//   username: string | null;
//   role: "user" | "admin" | "superadmin" | null;
//   hydrated: boolean;

//   setAuth: (token: string, username: string, role: AuthState["role"]) => void;
//   clearAuth: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       token: null,
//       username: null,
//       role: null,
//       hydrated: false,

//       setAuth: (token, username, role) =>
//         set(() => ({
//           token,
//           username,
//           role,
//         })),

//       clearAuth: () =>
//         set(() => ({
//           token: null,
//           username: null,
//           role: null,
//         })),
//     }),
//     {
//       name: "auth-storage",
//       onRehydrateStorage: (state) => {
//         state.hydrated = true;
//       },
//     }
//   )
// );









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
      name: "auth-store", // اسم التخزين بالـ localStorage
    }
  )
);
