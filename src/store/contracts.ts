import { createSlice } from "@reduxjs/toolkit";
import { IDataContractType } from "../helpers/types";

const contractsSlice = createSlice({
  name: "contracts",
  initialState: {
    contractChoosenOne: null,
    contractList: [],
    loadingPO: false,
  } as {
    contractChoosenOne: null | IDataContractType | any;
    contractList: IDataContractType[];
    loadingPO: boolean;
  },
  reducers: {
    setContractChoosenOne(state, selection) {
      state.contractChoosenOne = selection.payload;
    },
    setContractsList(state, contractList) {
      state.contractList = contractList.payload
    },
    setLoadingPo(state, bool) {
      state.loadingPO = bool.payload
    }
  },
});

export const contractsActions = contractsSlice.actions;
export default contractsSlice.reducer;
