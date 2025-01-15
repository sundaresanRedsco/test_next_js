import { create } from "zustand";
interface Store {
  storedNodes: any;
  setstoredNodes: (value: any) => void;
  nodeFunctions: {
    id: any;
    method: "DELETE_NODES" | "ADD_NODE" | "DELETE_EDGES" | "ADD_EDGES" | "";
    obj: any;
  };
  setNodeFunction: (value: any) => void;
  resetNodeFunction: () => void;
  nodeWithinFrame: string;
  setNodeWithinFrame: (value: any) => void;
  dimensions: any;
  // setDimensions: (value: any) => void;
  setDimension: (key: string, value: any) => void;
  selectedFlowIds: any;
  addFlowId: any;
  removeFlowId: any;
  resetSelectedFlowIds: () => void;
  copiedData: any;
  setCopiedData: (state: any) => void;
  resetCopiedData: () => void;
  copyClicked: boolean;
  setCopyClicked: (value: boolean) => void;
  cutClicked: boolean;
  setCutClicked: (value: boolean) => void;
}

export const useWorkflowStore = create<Store>((set, get) => ({
  storedNodes: [],
  setstoredNodes: (value) => set({ storedNodes: value }),
  nodeFunctions: { id: "", method: "", obj: null },
  setNodeFunction: (value) => set({ nodeFunctions: value }),
  resetNodeFunction: () =>
    set({ nodeFunctions: { id: "", method: "", obj: null } }),
  nodeWithinFrame: "",
  setNodeWithinFrame: (value) => set({ nodeWithinFrame: value }),
  dimensions: {},
  // setDimensions: (value) => set((prev) => ({ dimensions: value })),
  setDimension: (key, value) =>
    set((prev) => ({ dimensions: { ...prev.dimensions, [key]: value } })),
  selectedFlowIds: [],
  addFlowId: (newItem: any, type?: string) => {
    set((prev) => {
      const updatedFlowIds =
        type == "groupNode"
          ? [newItem, ...prev.selectedFlowIds]
          : [...prev.selectedFlowIds, newItem];
      return { selectedFlowIds: updatedFlowIds };
    });
  },
  removeFlowId: (newItem: any) =>
    set((prev) => ({
      selectedFlowIds: prev.selectedFlowIds.filter(
        (item: any) => item !== newItem
      ),
    })),
  resetSelectedFlowIds: () => set({ selectedFlowIds: [] }),
  copiedData: [],
  setCopiedData: (newItem: any) => set((prev) => ({ copiedData: newItem })),
  resetCopiedData: () => set({ copiedData: [] }),
  copyClicked: false,
  setCopyClicked: (value: boolean) => set({ copyClicked: value }),
  cutClicked: false,
  setCutClicked: (value: boolean) => set({ cutClicked: value }),
}));
