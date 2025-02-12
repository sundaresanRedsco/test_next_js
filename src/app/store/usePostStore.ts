import { create } from "zustand";
interface Store {
  openPostAnchorEl: null | any;
  setopenPostAnchorEl: (event: any) => void;
  triggerGetPost: boolean;
  setTriggerGetPost: (state: boolean) => void;
  channelId: string | "";
  setChannelId: (value: string) => void;
  openCommentAnchorEl: null | any;
  setopenCommentAnchorEl: (event: any) => void;
  postId: string | "";
  setPostId: (value: string) => void;
  resetAllPostStoreData: () => void;
}
const intialState: any = {
  openPostAnchorEl: null,
  triggerGetPost: false,
  openCommentAnchorEl: null,
  channelId: "",
  postId: "",
};
export const usePostStore = create<Store>((set, get) => ({
  ...intialState,
  setTriggerGetPost: (state: boolean) => set({ triggerGetPost: state }),
  setopenPostAnchorEl: (event: any) => set({ openPostAnchorEl: event }),
  setChannelId: (value: any) => set({ channelId: value }),
  setopenCommentAnchorEl: (event: any) => set({ openCommentAnchorEl: event }),
  setPostId: (value: any) => set({ postId: value }),

  resetAllPostStoreData: () => set(intialState),
}));
