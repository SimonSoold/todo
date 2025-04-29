import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import data from "../assets/mock.json"
import { Todo, TodoState, Project, Label, TaskLabelMap } from '../types'
const defaultState: TodoState = {
  todos: [],
  projectId: "",
  projects: [],
  labels: [],
  taskLabelMaps: []
}
const persistedState: TodoState = {
  todos: [...data.todos as Todo[]],
  projectId: data.projects[0].id,
  projects: [...data.projects] as Project[],
  labels: [...data.labels] as Label[], 
  taskLabelMaps: [...data.task_label_map] as TaskLabelMap[],
}
const initialState: TodoState = {
  ...defaultState,
  ...persistedState
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Omit<Todo, 'created_at' | 'updated_at' | 'project_id'>>) {
      const todos = state.todos
      const newTodo: Todo = {
        ...action.payload,
        id: "todo-" + (todos.length + 1),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        project_id: state.projectId
      };        
      state.todos.push(newTodo);
    },
    deleteTodo(state, action:PayloadAction<{id:string}>) {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    editTodo(state, action:PayloadAction<Todo>) {
      let index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
          updated_at: new Date().toISOString(),
        }
      }
    },
    setComplete(state,action:PayloadAction<{id: string, completed: boolean}>) { 
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.is_completed = action.payload.completed;
        todo.updated_at = new Date().toISOString();
      }
    },
    setProjectId(state, action:PayloadAction<string>) {
      state.projectId = action.payload
    },
    createProject(state, action:PayloadAction<{name:string; color: string | null, user_id: string}>) {  
      const newProject: Project = {
        id: "project-" + (state.projects.length + 1),
        created_at: new Date().toISOString(),
        ...action.payload
      };
      state.projects.push(newProject);
    },
    deleteProject(state, action:PayloadAction<{id:string}>) {
      const index = state.projects.findIndex((project: Project) => project.id === action.payload.id);
      if (index !== -1) {
        state.projects.splice(index, 1);
      }
    },
    editProject(state, action:PayloadAction<Project>) {
      let index = state.projects.findIndex((project:Project) => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.todos[index],
          ...action.payload,
        }
      }
    },
    addLabel(state, action:PayloadAction<{user_id:string, name:string, id:string, color:string}>) {   
      const labelMap = state.taskLabelMaps.find(item => item.task_id === action.payload.id)
      const newLabel = {
        id: labelMap ? labelMap.label_id : "label-" + (state.labels.length + 1),
        user_id:action.payload.user_id,
        name:action.payload.name,
        color: action.payload.color,
        created_at: new Date().toISOString(),
      };
      if (!labelMap) {
        const newTaskLabelMap = {
          task_id: action.payload.id,
          label_id: newLabel.id
        }
        state.taskLabelMaps.push(newTaskLabelMap);
      }
      state.labels.push(newLabel);
    }
}})
export const { 
  setComplete,
  deleteTodo,
  editTodo,
  addTodo,
  setProjectId,
  createProject,
  deleteProject,
  editProject,
  addLabel
} = todoSlice.actions
export default todoSlice.reducer