
import { createSlice } from "@reduxjs/toolkit";
import { ISMSDataType } from "../helpers/types";

const smsSlice = createSlice({
  name: "sms",
  initialState: { selectedSMS: [], allSMS: []} as {selectedSMS: ISMSDataType[], allSMS: ISMSDataType[]},
  reducers: {
    setSelectOneSms(state, selectedSMS) {
      state.selectedSMS = !!state.selectedSMS.find(elem => elem.id === selectedSMS.payload.id)
      ? state.selectedSMS.filter((elem) => elem.id !== selectedSMS.payload.id)
      : [...state.selectedSMS, selectedSMS.payload];
    },
    setAllSelect(state){
      state.selectedSMS = state.selectedSMS.length > 0 ?
      [] : state.allSMS
    },
    clearSMSSelection(state){
      state.selectedSMS = []
    },
    setAllSmsList(state, smsList) {
      state.allSMS = smsList.payload
    }
  },
});


export const smsActions = smsSlice.actions;
export default smsSlice.reducer;