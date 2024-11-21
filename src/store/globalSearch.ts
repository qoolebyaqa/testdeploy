import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "search",
  initialState: {
    globalSearchValue: '',
    isSearchApplied: false,
    trigerUpdate: false,
  } as {
    globalSearchValue: string;
    isSearchApplied: boolean;
    trigerUpdate: boolean,
  },
  reducers: {
    setGlobalSearchValue(state, val) {
      state.globalSearchValue = val.payload
    },
    setIsSearchApplied(state, bool) {
      state.isSearchApplied = bool.payload
    },
    setTriggerUpdate(state) {
      state.trigerUpdate = !state.trigerUpdate
    }
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
