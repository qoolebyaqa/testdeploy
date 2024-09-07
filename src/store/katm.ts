import { createSlice } from "@reduxjs/toolkit";
import { dataKATM } from "../helpers/fnHelpers";
import { IDataKatmType } from "../helpers/types";

const katmSlice = createSlice({
  name: "katm",
  initialState: {
    katmChoosenOne: null,
    katmSelected: [],
    allKATM: dataKATM,
  } as {
    katmChoosenOne: null | IDataKatmType | any;
    katmSelected: React.Key[];
    allKATM: IDataKatmType[];
  },
  reducers: {
    setKATMChoosenOne(state, chosenOne) {
      state.katmChoosenOne = chosenOne.payload;
    },
    setOneKatmSelect(state, selectedKey) {
      state.katmSelected = state.katmSelected.includes(selectedKey.payload)
        ? state.katmSelected.filter((k: React.Key) => k !== selectedKey.payload)
        : [...state.katmSelected, selectedKey.payload];
    },
    setAllKATMSelect(state) {
      state.katmSelected =
        state.katmSelected.length > 0
          ? []
          : state.allKATM.map((val) => val.key);
    },
  },
});

export const katmActions = katmSlice.actions;
export default katmSlice.reducer;
