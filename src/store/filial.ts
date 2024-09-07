import { createSlice } from "@reduxjs/toolkit";
import { dataFilials } from "../helpers/fnHelpers";
import { IDataFilialType } from "../helpers/types";

const filialSlice = createSlice({
  name: "filial",
  initialState: {
    filialChoosenOne: null,
    allFilials: dataFilials,
    /* productsOfCredit: [{ id: Math.random().toFixed(8) }], */
  } as {
    filialChoosenOne: null | IDataFilialType | any;
    allFilials: IDataFilialType[];
    /* productsOfCredit: { [key: string]: string }[]; */
  },
  reducers: {
    setFilialChoosenOne(state, selection) {
      state.filialChoosenOne = selection.payload;
    },    
    /* addproductOfCredit(state, id) {
      state.productsOfCredit.push({ id: id.payload });
    },
    deleteproductOfCredit(state, id) {
      state.productsOfCredit = state.productsOfCredit.filter(
        (item) => item.id !== id.payload
      );
    },
    setproductsOfCredit(state, formItems) {
      state.productsOfCredit = state.productsOfCredit.map((item) =>
        item.id === formItems.payload.id
          ? { ...item, [formItems.payload.title]: formItems.payload.value }
          : item
      );
    }, */
  },
});

export const filialActions = filialSlice.actions;
export default filialSlice.reducer;
