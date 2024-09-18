import { createSlice } from "@reduxjs/toolkit";
import { dataEmployees } from "../helpers/fnHelpers";
import { IDataEmployeeType } from "../helpers/types";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeChoosenOne: null,
    employeeSelected: [],
    allEmployees: dataEmployees,
    newEmployeeGender: "MALE",
  } as {
    employeeChoosenOne: null | IDataEmployeeType | any,
    employeeSelected: number[] | any;
    allEmployees: IDataEmployeeType[];
    newEmployeeGender: string;
  },
  reducers: {
    setEmployeeChoosenOne(state, selection) {      
      state.employeeChoosenOne = selection.payload;
      console.log(state.employeeChoosenOne);
    },
    setEmployeeList(state, employeeList) {
      state.allEmployees = employeeList.payload
    },
    setEmployeeSelectedOne(state, selectedID) {
      state.employeeSelected = state.employeeSelected.includes(
        selectedID.payload
      )
        ? state.employeeSelected.filter(
            (k: number) => k !== selectedID.payload
          )
        : [...state.employeeSelected, selectedID.payload];
    },
    setAllEmployeeSelect(state) {
      state.employeeSelected =
        state.employeeSelected.length > 0
          ? []
          : state.allEmployees.map((val) => val.id);
    },
    setNewEmployeeGender(state, gender) {
      state.newEmployeeGender = gender.payload.value;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
