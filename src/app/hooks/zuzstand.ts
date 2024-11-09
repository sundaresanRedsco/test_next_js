import { create } from "zustand";

export const useStore = create((set: any) => ({
  items: null,
  setItems: (newItem: any) => set(() => ({ items: newItem })),
}));
