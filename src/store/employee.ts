
import { createSlice } from "@reduxjs/toolkit";
import { dataEmployees } from "../helpers/fnHelpers";
import { IDataEmployeeType } from "../helpers/types";

const employeeSlice = createSlice({
  name: "employee",
  initialState: { employeeSelectedOne: null, allEmployees: dataEmployees, newEmployeeGender: true} as 
  {
    employeeSelectedOne: null | IDataEmployeeType | any, 
    allEmployees: IDataEmployeeType[], 
    newEmployeeGender: boolean
  },
  reducers: {
    setEmployeeSelectedOne(state, selection) {
      state.employeeSelectedOne = selection.payload
    },
    setNewEmployeeGender(state, gender) {
      state.newEmployeeGender = gender.payload
    }
  },
});


export const employeelActions = employeeSlice.actions;
export default employeeSlice.reducer;