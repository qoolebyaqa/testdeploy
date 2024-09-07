import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  access_token: string |  null, 
  authLoading: boolean,
  authError: string
}

const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: null, authLoading: false, authError: '' } as IAuthState,
  reducers: {
    setCurToken(state, access) {
      state.access_token = access.payload
    },
    setAuthLoading(state, bool) {
      state.authLoading = bool.payload;
    },
    setAuthError(state, message) {
      state.authError = message.payload;
    }
  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;