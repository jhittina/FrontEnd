import { configureStore } from '@reduxjs/toolkit'
import productionSlice from '../services/ProductionSlice'
import SigninSlice from '../services/SigninSlice';


export const store = configureStore({
  reducer: {
    app: productionSlice,
    // app: SigninSlice,
  },
});