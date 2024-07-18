import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';
import clientReducer from './client';

const store = configureStore({
  reducer:  { clientsStore: clientReducer,
  auth: authReducer },
});


export default store;
