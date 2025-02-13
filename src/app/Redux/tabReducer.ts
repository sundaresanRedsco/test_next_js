import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  tabsLoading: boolean;
  tabs: any[];
};

const initialState: InitialStateType = {
  tabsLoading: false,
  tabs: ["get_started"],
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabs(state, action) {
      //   const newTabs = action.payload;

      //   // Remove existing tabs that match the new tabs
      //   state.tabs = state.tabs.filter((tab) => tab === action.payload);

      // Add new tabs from action.payload
      state.tabs = action.payload;
    },
    setAddTabs(state, action) {
      if (state.tabs?.includes(action.payload)) {
        return;
      }

      // Get the current search parameters from the URL
      const searchParams = new URLSearchParams(window.location.search);

      // Retrieve existing tabs from the query parameter if it exists
      const existingTabs: string[] = searchParams.get("tabs")
        ? searchParams.get("tabs")!.split(",")
        : [];

      // Check if the tabId is already in the list of existing tabs

      if (!existingTabs.includes(action.payload)) {
        if (existingTabs.some((x) => x.includes("designflow_"))) {
          // Add the new tabId if it's not already in the list
          existingTabs.push(action.payload);
        } else {
          existingTabs.unshift(action.payload);
        }

        // Add the new tabId if it's not already in the list
      }

      // Update the `tabs` query parameter with the updated list of tabs
      searchParams.set("tabs", existingTabs.join(","));
      let tempArr = [];

      if (state.tabs.some((x) => x.includes("designflow_"))) {
        // Add the new tabId if it's not already in the list
        tempArr = [...state.tabs, action.payload];
      } else {
        tempArr = [action.payload, ...state.tabs];
      }

      // Update the state with the new tab

      // Update the URL with the new query parameter
      const newSearch = `?${searchParams.toString()}`;
      window.history.replaceState(null, "", newSearch);
      state.tabs = tempArr;
    },

    setRemoveTabs(state, action) {
      if (!state.tabs.includes(action.payload)) {
        return;
      }

      // Get the current search parameters from the URL
      const searchParams = new URLSearchParams(window.location.search);

      // Retrieve existing tabs from the query parameter if it exists
      const existingTabs: string[] = searchParams.get("tabs")
        ? searchParams.get("tabs")!.split(",")
        : [];

      // Remove the tabId from the list if it exists
      const updatedTabs = existingTabs.filter(
        (tabId) => tabId !== action.payload
      );

      // Update the `tabs` query parameter with the updated list of tabs
      searchParams.set("tabs", updatedTabs.join(","));

      // Update the state with the remaining tabs
      const tempArr = state.tabs.filter((tab) => tab !== action.payload);

      // Update the URL with the new query parameter
      const newSearch = `?${searchParams.toString()}`;
      window.history.replaceState(null, "", newSearch);
      state.tabs = tempArr;
    },
  },
  extraReducers(builder) {},
});

export type tabsReducer = ReturnType<typeof tabsSlice.reducer>;
export const { setTabs, setAddTabs, setRemoveTabs } = tabsSlice.actions;

export default tabsSlice.reducer;
