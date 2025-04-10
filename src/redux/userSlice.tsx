import { createSlice } from '@reduxjs/toolkit'
import data from "../assets/mock.json"
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
        name: "",
        email: "",
        created_at: "",
        id: "",
    },
    loggedIn: false,
    token: ""
  },
  reducers: {
    logout(state) {
      state.user = {
        name: "",
        email: "",
        created_at: "",
        id: "",
      }
      state.loggedIn = false
      state.token = ""
    },
    login(state, action) {
      const user = data.users.find((user) => (user.email === action.payload.username || user.name === action.payload.username) && user.password_hash === action.payload.password);
      if (user) {
        state.user = {
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            id: user.id,
        }
        state.loggedIn = true
        state.token = "token"
      } else {
        state.loggedIn = false
      }
    }
}})
export const { 
    logout,
    login
} = userSlice.actions
export default userSlice.reducer