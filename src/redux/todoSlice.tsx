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
        todo.updated_at = new Date().toISOString();
      }
    },
    deleteTodo(state, action) {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    editTodo(state, action) {
      let index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
          updated_at: new Date().toISOString(),
        }
      }
    },
    addTodo(state, action) {
      const todos = state.todos.filter((todo) => todo.project_id === state.projectId);
      const newTodo = {
        id: "project-" + todos.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        project_id: state.projectId,
        ...action.payload
      };        
      state.todos.push(newTodo);
    },
    createProject(state, action) {  
      const newProject = {
        id: "project-" + state.projects.length + 1,
        created_at: new Date().toISOString(),
        ...action.payload
      };
      state.projects.push(newProject);
    }
}})
export const { 
  setProjectId,
  setComplete,
  deleteTodo,
  editTodo,
  addTodo,
  createProject
} = todoSlice.actions
export default todoSlice.reducer