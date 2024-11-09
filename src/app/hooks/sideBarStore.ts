import { create } from "zustand";
interface Store {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (state: boolean) => void;
}

export const useSideBarStore = create<Store>((set, get) => ({
  //**Sidebar collapse */
  isSidebarCollapsed: true,
  setIsSidebarCollapsed: (state: boolean) => set({ isSidebarCollapsed: state }),
}));
