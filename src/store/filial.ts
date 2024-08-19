
import { createSlice } from "@reduxjs/toolkit";
import { dataFilials } from "../helpers/fnHelpers";
import { IDataFilialType } from "../helpers/types";

const filialSlice = createSlice({
  name: "filial",
  initialState: { filialSelectedOne: null, allFilials: dataFilials} as {filialSelectedOne: null | IDataFilialType | any, allFilials: IDataFilialType[]},
  reducers: {
    setFilialSelectedOne(state, selection) {
      state.filialSelectedOne = selection.payload
    }
  },
});


export const filialActions = filialSlice.actions;
export default filialSlice.reducer;