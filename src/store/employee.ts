import { createSlice } from "@reduxjs/toolkit";
import { dataEmployees } from "../helpers/fnHelpers";
import { IDataEmployeeType } from "../helpers/types";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeSelected: [],
    allEmployees: dataEmployees,
    newEmployeeGender: "MALE",
  } as {
    employeeSelected: React.Key[];
    allEmployees: IDataEmployeeType[];
    newEmployeeGender: string;
  },
  reducers: {
    setEmployeeList(state, emplyeeList) {
      state.allEmployees = emplyeeList.payload
    },
    setEmployeeSelectedOne(state, selectedKey) {
      state.employeeSelected = state.employeeSelected.includes(
        selectedKey.payload
      )
        ? state.employeeSelected.filter(
            (k: React.Key) => k !== selectedKey.payload
          )
        : [...state.employeeSelected, selectedKey.payload];
    },
    setAllEmployeeSelect(state) {
      state.employeeSelected =
        state.employeeSelected.length > 0
          ? []
          : state.allEmployees.map((val) => val.key);
    },
    setNewEmployeeGender(state, gender) {
      state.newEmployeeGender = gender.payload.value;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
