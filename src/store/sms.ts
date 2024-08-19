
import { createSlice } from "@reduxjs/toolkit";
import { dataSMS } from "../helpers/fnHelpers";
import { ISMSDataType } from "../helpers/types";

const smsSlice = createSlice({
  name: "sms",
  initialState: { smsSelectedOne: null, allSMS: dataSMS} as {smsSelectedOne: null | ISMSDataType | any, allSMS: ISMSDataType[]},
  reducers: {
    setSmsSelectedOne(state, selection) {
      state.smsSelectedOne = selection.payload
    }
  },
});


export const smsActions = smsSlice.actions;
export default smsSlice.reducer;