import { createSlice } from '@reduxjs/toolkit'
import data from "../assets/mock.json"
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [...data.todos],
    projectId: data.projects[0].id,
    projects: [...data.projects],
  },
  reducers: {
    setProjectId(state, action) {
      state.projectId = action.payload
    }
  }
})
export const { setProjectId } = todoSlice.actions
export default todoSlice.reducer