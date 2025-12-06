import { create } from "zustand";

export const useAuthSignal = create<{
  value: number;
  refresh: () => void;
}>((set) => ({
  value: 0,
  refresh: () => set((s) => ({ value: s.value + 1 })),
}));
