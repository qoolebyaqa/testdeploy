import { createSlice } from "@reduxjs/toolkit";
import { dataContracts } from "../helpers/fnHelpers";
import { IDataContractType } from "../helpers/types";

const contractsSlice = createSlice({
  name: "contracts",
  initialState: {
    contractChoosenOne: null,
    allContracts: dataContracts,
  } as {
    contractChoosenOne: null | IDataContractType | any;
    allContracts: IDataContractType[];
  },
  reducers: {
    setContractChoosenOne(state, selection) {
      state.contractChoosenOne = selection.payload;
    },
  },
});

export const contractsActions = contractsSlice.actions;
export default contractsSlice.reducer;
