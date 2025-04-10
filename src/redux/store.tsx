import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
export const store = configureStore({
  reducer: combineReducers({
    todo:todoReducer
  })
})