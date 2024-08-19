
import { createSlice } from "@reduxjs/toolkit";
import { dataKATM } from "../helpers/fnHelpers";
import { IDataKatmType } from "../helpers/types";

const katmSlice = createSlice({
  name: "katm",
  initialState: { katmSelectedOne: null, allKATM: dataKATM} as {katmSelectedOne: null | IDataKatmType | any, allKATM: IDataKatmType[]},
  reducers: {
    setKatmSelectedOne(state, selection) {
      state.katmSelectedOne = selection.payload
    }
  },
});


export const katmActions = katmSlice.actions;
export default katmSlice.reducer;