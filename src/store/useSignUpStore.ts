import { create } from "zustand";
interface Store {
  userData: any | null;
  setUserData: (res: any) => void;
  formDataStore: Record<string, any> | null;
  setFormDataStore: (key: string, value: any) => void;
  apiDataStore: Record<string, any> | null;
  setApiDataStore: (key: string, value: any) => void;
  activeStep: number;
  setactiveStep: (value: number) => void;
  handleStep: () => void;
  handleBack: () => void;
  setIsLoading: (res: boolean) => void;
  isLoading: boolean;
  open: boolean;
  setopen: (state: boolean) => void;
  handleOpen: (message?: string) => void;
  message: string;
  openSignUp: boolean;
  setOpenSignUp: (state: boolean) => void;
  handleOpenSignUp: () => void;
  isTotpEnabled: boolean;
  setIsTotpEnabled: (state: boolean) => void;
  resetSignUpStoreByKey: (state: string) => void;
  resetSignUpStore: (state: boolean) => void;
}
const intialState: any = {
  isTotpEnabled: false,
  userData: null,
  isLoading: false,
  open: false,
  message: "",
  openSignUp: false,
  formDataStore: { doc_type: "URL", currentPage: "Login", invite_token: "" },
  apiDataStore: null,
  activeStep: -1,
};
export const useSignUpStore = create<Store>((set, get) => ({
  ...intialState,
  //**Global UserData */
  setUserData: (res) => set({ userData: res }),

  //**Global loading state */
  setIsLoading: (res: boolean) => set({ isLoading: res }),

  //**Popup function */
  setopen: (state: boolean) => set({ open: state }),
  handleOpen: (message?: string) => set({ message: message, open: true }),

  //**SignUp POP Up */
  setOpenSignUp: (state: boolean) => set({ openSignUp: state }),
  handleOpenSignUp: () => set({ openSignUp: true }),

  //**Form Data Store */
  setFormDataStore: (key, value) =>
    set((state) => ({
      formDataStore: { ...state.formDataStore, [key]: value },
    })),

  //**Api Data Store */
  setApiDataStore: (key, value) =>
    set((state) => ({
      apiDataStore: { ...state.apiDataStore, [key]: value },
    })),
  //**Stepper Store */
  setactiveStep: (value: number) => set({ activeStep: value }),
  handleStep: () => set({ activeStep: get().activeStep + 1 }),
  handleBack: () =>
    set({
      activeStep:
        get().activeStep > 0 ? get().activeStep - 1 : get().activeStep,
    }),

  //*Totp */
  setIsTotpEnabled: (state) => set({ isTotpEnabled: state }),

  resetSignUpStoreByKey: (key) => set({ [key]: intialState[key] }),
  resetSignUpStore: () => set(intialState),
}));
