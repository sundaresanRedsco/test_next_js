import { create } from "zustand";
interface Store {
  isPageLoading: boolean;
  setIsPageLoading: (state: boolean) => void;
  dropItem: any;
  setdropItems: (state: any) => void;
  arr: any;
  setArr: any;

  height: any;
  setHeight: (state: any) => void;
  selectedLink: any;
  setSelectedLink: (state: any) => void;
}

export const useGlobalStore = create<Store>((set, get) => ({
  isPageLoading: false,
  setIsPageLoading: (state: boolean) => set({ isPageLoading: state }),
  dropItem: null,
  setdropItems: (newItem: any) => set(() => ({ dropItem: newItem })),
  arr: [],
  setArr: (newItem: any) => set(() => ({ arr: newItem })),
  height: 250,
  setHeight: (newItem: any) => set(() => ({ height: newItem })),
  selectedLink: "dashboard",
  setSelectedLink: (newItem: any) => set(() => ({ selectedLink: newItem })),
}));
