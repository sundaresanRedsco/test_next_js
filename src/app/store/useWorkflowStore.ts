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
}));
