import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import clientReducer from "./client";
import filialReducer from "./filial";
import smsReducer from "./sms";
import employeelReducer from "./employee";
import katmReducer from "./katm";
import contractsReducer from "./contracts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    clientStore: clientReducer,
    filialStore: filialReducer,
    smsStore: smsReducer,
    employeeStore: employeelReducer,
    katmStore: katmReducer,
    contractStore: contractsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
