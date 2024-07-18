import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: { activeDateRange: ''},
  reducers: {
    setActiveDateRange(state, name) {
      state.activeDateRange = name.payload
    }
  },
});


export const clientsActions = clientSlice.actions;
export default clientSlice.reducer;