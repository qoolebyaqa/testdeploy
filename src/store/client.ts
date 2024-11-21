import { createSlice } from "@reduxjs/toolkit";
/* import { dataClients } from "../helpers/fnHelpers"; */
import { IDataClientType } from "../helpers/types";
import { IRegion } from "../helpers/API/Schemas";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientChoosenOne: null,
    clientsList: [],
    regionsList: [],
    clientLoading: false,
    globalSearchValue: '',
    isSearchApplied: false,
    stepState: {id: 0, step: 'initial', maxStep: 0},
    katmRequest: {result: 'none', styles: 'text-lombard-text-black border-lombard-borders-grey border-[1px]'}
  } as {
    clientChoosenOne: null | IDataClientType | any;
    clientsList: IDataClientType[] | [];
    regionsList: IRegion[] | [];
    depositCommentForm: { [key: string]: string }[];
    clientLoading: boolean;
    globalSearchValue: string;
    isSearchApplied: boolean;
    katmRequest: {result: string, styles: string},
    stepState: {id: number, step: 'initial' | 'hold' | 'collateral' | 'credit' | 'deal_info', maxStep: number}
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
    setKatmRequest(state, requestResult) {
      state.katmRequest = requestResult.payload;
    },
    clearNewClientFormData(state){
      state.depositCommentForm = [{ id: Math.random().toFixed(8) }]
      state.katmRequest = {result: 'none', styles: 'text-lombard-text-black border-lombard-borders-grey border-[1px]'}
    },
    setAllRegions(state, data) {
      state.regionsList = data.payload
    },
    setStepState(state, step) {
      state.stepState = {...state.stepState, ...step.payload}
    },
    setGlobalSearchValue(state, val) {
      state.globalSearchValue = val.payload
    },
    setIsSearchApplied(state, bool) {
      state.isSearchApplied = bool.payload
    }
  },
});

export const clientActions = clientSlice.actions;
export default clientSlice.reducer;
