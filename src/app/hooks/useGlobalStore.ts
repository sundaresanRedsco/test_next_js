import { create } from "zustand";
interface Store {
  isPageLoading: boolean;
  setIsPageLoading: (state: boolean) => void;
  dropItem: any;
  setdropItems: (state: any) => void;
  arr: any;
  setArr: any;
  selectedFlowIds: any;
  addFlowId: any;
  removeFlowId: any;
  height: any;
  setHeight: (state: any) => void;
}

export const useGlobalStore = create<Store>((set, get) => ({
  isPageLoading: false,
  setIsPageLoading: (state: boolean) => set({ isPageLoading: state }),
  dropItem: null,
  setdropItems: (newItem: any) => set(() => ({ dropItem: newItem })),
  arr: [],
  setArr: (newItem: any) => set(() => ({ arr: newItem })),
  selectedFlowIds: [],
  addFlowId: (newItem: any) =>
    set((prev) => ({ selectedFlowIds: [...prev.selectedFlowIds, newItem] })),
  removeFlowId: (newItem: any) =>
    set((prev) => ({
      selectedFlowIds: prev.selectedFlowIds.filter(
        (item: any) => item !== newItem
      ),
    })),
  height: 250,
  setHeight: (newItem: any) => set(() => ({ height: newItem })),
}));
