
import { createSlice } from "@reduxjs/toolkit";
import { dataSMS } from "../helpers/fnHelpers";
import { ISMSDataType } from "../helpers/types";

const smsSlice = createSlice({
  name: "sms",
  initialState: { selectedSMS: [], allSMS: dataSMS} as {selectedSMS: React.Key[], allSMS: ISMSDataType[]},
  reducers: {
    setSelectOneSms(state, selectedKey) {
      state.selectedSMS = state.selectedSMS.includes(selectedKey.payload)
      ? state.selectedSMS.filter((k: React.Key) => k !== selectedKey.payload)
      : [...state.selectedSMS, selectedKey.payload];
    },
    setAllSelect(state){
      state.selectedSMS = state.selectedSMS.length > 0 ?
      [] : state.allSMS.map(val => val.key)
    }
  },
});


export const smsActions = smsSlice.actions;
export default smsSlice.reducer;