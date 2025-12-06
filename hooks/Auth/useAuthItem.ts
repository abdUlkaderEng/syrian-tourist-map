import { useEffect, useState } from "react";
import { getAuthItem } from "./authCookies";
import { useAuthSignal } from "./authSignal";

export function useAuthItem(key: string) {
  const [value, setValue] = useState("");
    const { value: signal } = useAuthSignal();

  useEffect(() => {
    const stored = getAuthItem(key);
    setValue(stored);
  }, [key,signal]);

  return value;
}
