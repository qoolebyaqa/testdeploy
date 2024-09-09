import { createSlice } from "@reduxjs/toolkit";
import { dataClients } from "../helpers/fnHelpers";
import { IDataClientType } from "../helpers/types";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientsList: dataClients,
    regClientStep: 0,
    depositCommentForm: [{ id: Math.random().toFixed(8) }],
    clientLoading: false,
    katmRequest: {result: 'none', styles: 'text-lombard-text-black border-lombard-borders-grey border-[1px]'}
  } as {
    clientsList: IDataClientType[];
    regClientStep: number;
    depositCommentForm: { [key: string]: string }[];
    clientLoading: boolean;
    katmRequest: {result: string, styles: string}
  },
  reducers: {
    setClientLoading(state, bool){
      state.clientLoading = bool.payload
    },
    setClientsList(state, clientList){
      state.clientsList = clientList.payload
    },
    addRegClientStep(state) {
      if (state.regClientStep < 4) state.regClientStep++;
    },
    reduceRegClientStep(state) {
      if (state.regClientStep !== 0) state.regClientStep--;
    },
    addDepositCommentItem(state, id) {
      state.depositCommentForm.push({ id: id.payload });
    },
    deleteDepositItem(state, id) {
      state.depositCommentForm = state.depositCommentForm.filter(
        (item) => item.id !== id.payload
      );
    },
    setDepositCommentForm(state, formItems) {
      state.depositCommentForm = state.depositCommentForm.map((item) =>
        item.id === formItems.payload.id
          ? { ...item, [formItems.payload.title]: formItems.payload.value }
          : item
      );
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
