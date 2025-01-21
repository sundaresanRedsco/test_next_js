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
  nodeWithinFrame: string;
  setNodeWithinFrame: (value: any) => void;
  dimensions: any;
  // setDimensions: (value: any) => void;
  setDimension: (key: string, value: any) => void;
  selectedFlowIds: any;
  addFlowId: any;
  removeFlowId: any;
  copiedData: any;
  setCopiedData: (state: any) => void;
  nodeErrors: any;
  setNodeErrors: (key: string, value: any) => void;
  setNodeError: (key: string, value: any) => void;
  inputdatas: any;
  setInputData: (key: string, value: any) => void;
  updateInputData: (key: string, value: any) => void;
  setInputDataErr: (
    key: string,
    nestedKey: any,
    value: any,
    index?: number
  ) => void;
  setInputDatas: (value: any) => void;
  copyClicked: any;
  setCopyClicked: (key: any, value: boolean) => void;
  setParticularInputData: (key: any, value: any) => void;
  cutClicked: boolean;
  setCutClicked: (value: boolean) => void;
  resetWorkFlowState: (value: any) => void;
}
const initialStates: any = {
  storedNodes: [],
  nodeFunctions: { id: "", method: "", obj: null },
  nodeWithinFrame: "",
  dimensions: {},
  selectedFlowIds: [],
  copiedData: [],
  nodeErrors: {},
  inputdatas: {},
  copyClicked: {},
  cutClicked: false,
};
export const useWorkflowStore = create<Store>((set, get) => ({
  ...initialStates,
  setstoredNodes: (value) => set({ storedNodes: value }),
  setNodeFunction: (value) => set({ nodeFunctions: value }),
  setNodeWithinFrame: (value) => set({ nodeWithinFrame: value }),
  setDimension: (key, value) =>
    set((prev) => ({ dimensions: { ...prev.dimensions, [key]: value } })),
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
  setCopiedData: (newItem: any) => set((prev) => ({ copiedData: newItem })),
  setNodeErrors: (key, value) =>
    set((prev) => ({
      nodeErrors: prev.nodeErrors
        ? { ...prev.nodeErrors, [key]: value }
        : { [key]: value },
    })),
  setNodeError: (key, value) =>
    set((prev) => {
      const prevData = prev.nodeErrors[key];
      const errors = prevData
        ? prevData.includes(value)
          ? prevData
          : [...prevData, value]
        : [];
      return {
        nodeErrors: {
          ...prev.nodeErrors,
          [key]: errors,
        },
      };
    }),
  setInputData: (key, value) =>
    set((prev) => {
      const prevData = prev.inputdatas[key];
      let nestedValue;
      if (value.key == "input") {
        nestedValue = value.value;
      } else if (prevData[value.key]) {
        nestedValue = [...prevData[value.key], value.value];
      } else {
        nestedValue = [value.value];
      }

      return {
        inputdatas: {
          ...prev.inputdatas,
          [key]: {
            ...prevData,
            [value.key]: nestedValue,
          },
        },
      };
    }),
  setInputDataErr: (key, nestedKey, value, index) =>
    set((prev) => {
      const prevData = prev.inputdatas[key];
      const currentValue: any = prevData[nestedKey];
      let nestedValue;

      if (nestedKey == "input") {
        nestedValue = { ...currentValue, isErr: value };
      } else if (
        !!(
          currentValue &&
          ((index && index > 0) || index == 0) &&
          currentValue[index as any]
        )
      ) {
        currentValue[index as any].isErr = value;
        nestedValue = currentValue;
      } else {
        nestedValue = currentValue ? currentValue : [];
      }
      return {
        inputdatas: {
          ...prev.inputdatas,
          [key]: {
            ...prevData,
            [nestedKey]: nestedValue,
          },
        },
      };
    }),
  updateInputData: (key, { value, key: nestedKey, index }) =>
    set((prev) => {
      let prevData = prev.inputdatas[key]
        ? JSON.parse(JSON.stringify(prev.inputdatas[key]))
        : prev.inputdatas[key];

      if (Array.isArray(prevData[nestedKey])) {
        let keyData = [...prevData[nestedKey]];
        if (index !== undefined) {
          if (keyData[index] !== undefined) {
            keyData[index] = value;
          } else {
            keyData.push(value);
          }
        }

        prevData[nestedKey] = keyData;
      }

      return {
        inputdatas: {
          ...prev.inputdatas,
          [key]: prevData,
        },
      };
    }),
  setInputDatas: (value) => set((prev) => ({ inputdatas: value })),
  setParticularInputData: (key, value) =>
    set((prev) => ({ inputdatas: { ...prev.inputdatas, [key]: value } })),
  setCopyClicked: (key, value) =>
    set((prev) => {
      const prevData = prev.copyClicked;

      return {
        copyClicked: prevData
          ? { ...prevData, [key]: value }
          : { [key]: value },
      };
    }),
  setCutClicked: (value: boolean) => set({ cutClicked: value }),
  resetWorkFlowState: (name) => set({ [name]: initialStates[name] }),
}));
