import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import userReducer from './userSlice'
export const store = configureStore({
  reducer: combineReducers({
    todo:todoReducer,
    user:userReducer
  })
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;