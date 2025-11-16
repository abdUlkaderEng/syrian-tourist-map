"use client";
import { useEffect, useState } from "react";
import api from "./axios";
interface User {
  name: string;
}
interface AuthState {
  user: User | null;
  loading: boolean;
}
export function useAuth(): AuthState {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
