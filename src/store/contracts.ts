import { createSlice } from "@reduxjs/toolkit";
import { IDataContractType } from "../helpers/types";

const contractsSlice = createSlice({
  name: "contracts",
  initialState: {
    contractChoosenOne: null,
    contractList: [],
  } as {
    contractChoosenOne: null | IDataContractType | any;
    contractList: IDataContractType[];
  },
  reducers: {
    setContractChoosenOne(state, selection) {
      state.contractChoosenOne = selection.payload;
    },
    setContractsList(state, contractList) {
      state.contractList = contractList.payload
    }
  },
});

export const contractsActions = contractsSlice.actions;
export default contractsSlice.reducer;
