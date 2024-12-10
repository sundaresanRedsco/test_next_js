import { create } from "zustand";
interface Store {
  isPageLoading: boolean;
  setIsPageLoading: (state: boolean) => void;
  dropItem: any;
  setdropItems: (state: any) => void;
  arr: any;
  setArr: any;
}

export const useGlobalStore = create<Store>((set, get) => ({
  isPageLoading: false,
  setIsPageLoading: (state: boolean) => set({ isPageLoading: state }),
  dropItem: null,
  setdropItems: (newItem: any) => set(() => ({ dropItem: newItem })),
  arr: [],
  setArr: (newItem: any) => set(() => ({ arr: newItem })),
}));
