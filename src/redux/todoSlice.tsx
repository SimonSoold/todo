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
    },
    setComplete(state,action) { 
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.is_completed = action.payload.completed;
      }
    }
  }
})
export const { 
  setProjectId,
  setComplete
} = todoSlice.actions
export default todoSlice.reducer