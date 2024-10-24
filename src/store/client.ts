import { createSlice } from "@reduxjs/toolkit";
/* import { dataClients } from "../helpers/fnHelpers"; */
import { IDataClientType } from "../helpers/types";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientChoosenOne: null,
    regClientStep: 0,
    clientsList: [],
    clientLoading: false,
    katmRequest: {result: 'none', styles: 'text-lombard-text-black border-lombard-borders-grey border-[1px]'}
  } as {
    clientChoosenOne: null | IDataClientType | any;
    clientsList: IDataClientType[] | [];
    regClientStep: number;
    depositCommentForm: { [key: string]: string }[];
    clientLoading: boolean;
    katmRequest: {result: string, styles: string}
  },
  reducers: {
    setClientChoosenOne(state, selection) {
      state.clientChoosenOne = selection.payload;
    },
    setClientLoading(state, bool){
      state.clientLoading = bool.payload
    },
    setClientsList(state, clientList){
      state.clientsList = clientList.payload
    },
    clearRegStep(state) {
      state.regClientStep = 0
    },
    addRegClientStep(state) {
      if (state.regClientStep < 4) state.regClientStep++;
    },
    reduceRegClientStep(state) {
      if (state.regClientStep !== 0) state.regClientStep--;
    },
    setKatmRequest(state, requestResult) {
      state.katmRequest = requestResult.payload;
    },
    clearNewClientFormData(state){
      state.depositCommentForm = [{ id: Math.random().toFixed(8) }]
      state.regClientStep = 0
      state.katmRequest = {result: 'none', styles: 'text-lombard-text-black border-lombard-borders-grey border-[1px]'}
    }
  },
});

export const clientActions = clientSlice.actions;
export default clientSlice.reducer;
