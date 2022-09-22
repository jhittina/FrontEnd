import { configureStore } from '@reduxjs/toolkit'
import productionSlice from '../services/ProductionSlice'
import SigninSlice from '../services/SigninSlice';
import { combineReducers } from 'redux'

// const reducer = combineReducers({
//   user,
//   users,
// })

export const store = configureStore({
  reducer: {
    app: productionSlice,
    sign: SigninSlice,
  },
});