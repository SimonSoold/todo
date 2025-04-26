import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import data from "../assets/mock.json"
import { saveSessionState, loadSessionState } from '../utils/utils'
import { User } from '../types'
const persistedState = loadSessionState("user")

const defaultState: User = {
  name: "",
  email: "",
  created_at: "",
  id: ""
}
const initialState = {
  ...defaultState,
  ...persistedState
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state = {
        name: "",
        email: "",
        created_at: "",
        id: "",
        token: ""
      }
      sessionStorage.setItem("user", "")
    },
    login(_state, action: PayloadAction<{name: string; password: string;}>) {
      const user = data.users.find((user) => (user.email === action.payload.name || user.name === action.payload.name) && user.password_hash === action.payload.password);
      if (user) {
          const newState: User = {
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            id: user.id,
            token: "token"
        }
        saveSessionState(newState, "user")
        return newState
      } 
      return defaultState
    }
}})
export const { 
    logout,
    login
} = userSlice.actions
export default userSlice.reducer