import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: { regClientStep: 0, depositCommentForm: [{id: Math.random().toFixed(8)}]} as {regClientStep: number, depositCommentForm: {[key:string]: string}[]},
  reducers: {
    setRegClientStep(state, step) {
      state.regClientStep = step.payload
    },
    addDepositCommentItem(state, id) {
      state.depositCommentForm.push({id: id.payload})
    },
    deleteDepositItem(state, id) {
      state.depositCommentForm = state.depositCommentForm.filter(item => item.id !== id.payload)
    },
    setDepositCommentForm(state, formItems) {
      state.depositCommentForm = state.depositCommentForm.map(item => item.id === formItems.payload.id ? {...item, [formItems.payload.title]: formItems.payload.value}: item)
    }
  },
});


export const clientActions = clientSlice.actions;
export default clientSlice.reducer;