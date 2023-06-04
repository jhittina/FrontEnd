import { configureStore } from "@reduxjs/toolkit";
import productionSlice from "../services/ProductionSlice";
import SigninSlice from "../services/SigninSlice";
import { combineReducers } from "redux";
import VehicleSlice from "../services/VehicleSlice";
import CustomerSlice from "../services/CustomerSlice";

// const reducer = combineReducers({
//   user,
//   users,
// })

export const store = configureStore({
  reducer: {
    app: productionSlice,
    sign: SigninSlice,
    Vehicle: VehicleSlice,
    Customer: CustomerSlice,
  },
});
