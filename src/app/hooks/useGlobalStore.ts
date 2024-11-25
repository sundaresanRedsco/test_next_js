import { create } from "zustand";
interface Store {
  isPageLoading: boolean;
  setIsPageLoading: (state: boolean) => void;
}

export const useGlobalStore = create<Store>((set, get) => ({
  isPageLoading: false,
  setIsPageLoading: (state: boolean) => set({ isPageLoading: state }),
}));