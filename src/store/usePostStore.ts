import { create } from "zustand";
interface Store {
  openPostAnchorEl: null | any;
  setopenPostAnchorEl: (event: any) => void;
  triggerGetPost: boolean;
  setTriggerGetPost: (state: boolean) => void;
  channelId: string | "";
  setChannelId: (value: string) => void;
  openComment: "" | string;
  setopenComment: (value: any) => void;
  comment: string | "";
  setComment: (value: any) => void;
  mention: any;
  setMention: (value: any) => void;
  inputData: any;
  setinputData: (value: any) => void;
  file: null | any;
  setfile: (value: any) => void;
  selectedData: any;
  setselectedData: (value: any) => void;

  resetData: (state: string) => void;
  resetAllPostStoreData: () => void;
}
const intialState: any = {
  openPostAnchorEl: null,
  triggerGetPost: false,
  openComment: "",

  comment: "",
  mention: { email: "", id: "" },
  inputData: { media_url: "", content: "" },
  file: null,
  selectedData: { id: "", type: "", text: "" },
};
export const usePostStore = create<Store>((set, get) => ({
  ...intialState,
  channelId: "",
  setTriggerGetPost: (state: boolean) => set({ triggerGetPost: state }),
  setopenPostAnchorEl: (event: any) =>
    set({
      openPostAnchorEl: event,
      mention: intialState["mention"],
      comment: "",
      openComment: "",
    }),
  setChannelId: (value: any) => set({ channelId: value }),
  setopenComment: (value: any) => set({ openComment: value }),
  setComment: (value: any) => set({ comment: value }),
  setMention: (value: any) => set({ mention: value }),
  setselectedData: (value: any) => set({ selectedData: value }),
  setinputData: (value: any) => set({ inputData: value }),
  setfile: (value: any) => set({ file: value }),

  resetData: (state) => set({ [state]: intialState[state] }),
  resetAllPostStoreData: () => set(intialState),
}));
