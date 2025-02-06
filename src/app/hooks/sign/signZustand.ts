import { create } from "zustand";
interface Store {
  userData: any | null;
  setUserData: (res: any) => void;
  formDataStore: Record<string, any> | null;
  setFormDataStore: (key: string, value: any) => void;
  resetForm: () => void;
  apiDataStore: Record<string, any> | null;
  setApiDataStore: (key: string, value: any) => void;
  resetApiData: () => void;
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
}
const intialState: any = {
  isTotpEnabled: false,
};
export const useSignUpStore = create<Store>((set, get) => ({
  ...intialState,
  //**Global UserData */
  userData: null,
  setUserData: (res) => set({ userData: res }),

  //**Global loading state */
  isLoading: false,
  setIsLoading: (res: boolean) => set({ isLoading: res }),

  //**Popup function */
  open: false,
  setopen: (state: boolean) => set({ open: state }),
  message: "",
  handleOpen: (message?: string) => set({ message: message, open: true }),

  //**SignUp POP Up */
  openSignUp: false,
  setOpenSignUp: (state: boolean) => set({ openSignUp: state }),
  handleOpenSignUp: () => set({ openSignUp: true }),

  //**Form Data Store */
  formDataStore: { doc_type: "URL", currentPage: "Login", invite_token: "" },
  setFormDataStore: (key, value) =>
    set((state) => ({
      formDataStore: { ...state.formDataStore, [key]: value },
    })),
  resetForm: () =>
    set({
      formDataStore: {
        doc_type: "URL",
        currentPage: "Login",
        invite_token: "",
      },
    }),

  //**Api Data Store */
  apiDataStore: null,
  setApiDataStore: (key, value) =>
    set((state) => ({
      apiDataStore: { ...state.apiDataStore, [key]: value },
    })),
  resetApiData: () => set({ apiDataStore: null }),

  //**Stepper Store */
  activeStep: -1,
  setactiveStep: (value: number) => set({ activeStep: value }),
  handleStep: () => set({ activeStep: get().activeStep + 1 }),
  handleBack: () =>
    set({
      activeStep:
        get().activeStep > 0 ? get().activeStep - 1 : get().activeStep,
    }),

  //*Totp */
  setIsTotpEnabled: (state) => set({ isTotpEnabled: state }),
}));
