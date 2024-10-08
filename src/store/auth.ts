import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  access_token: string |  null, 
  authLoading: boolean,
  authError: string,
  currentUser: any
}

const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: null, authLoading: false, authError: '', currentUser: {role_id: "ADMIN", name: "Davronbek"} } as IAuthState,
  reducers: {
    setCurToken(state, access) {
      state.access_token = access.payload
    },
    setAuthLoading(state, bool) {
      state.authLoading = bool.payload;
    },
    setAuthError(state, message) {
      state.authError = message.payload;
    },
    setCurrentUser(state, userCred) {
      state.currentUser = userCred.payload
    }
  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;