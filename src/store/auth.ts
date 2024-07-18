import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userName: 'Arthur', authentificated: false },
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload
    },
    setAuthentificated(state) {
      state.authentificated = true;
    }
  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;