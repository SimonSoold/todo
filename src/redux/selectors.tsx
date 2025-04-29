import { createSelector } from "reselect";
import { 
    Todo,
    Project,
    Label,
    TaskLabelMap
} from "../types";
import { RootState } from "./store";
export const selectToken = (state:RootState):string | undefined => state.user.token
export const selectUserId = (state:RootState):string => state.user.id

export const selectTodos = (state:RootState):Todo[] => state.todo.todos;
export const selectProjectId = (state:RootState):string => state.todo.projectId;
export const selectProjects = (state:RootState):Project[] => state.todo.projects;

export const selectLabels = (state:RootState):Label[] => state.todo.labels; 
export const selectLabelMaps = (state:RootState):TaskLabelMap[] => state.todo.taskLabelMaps;

export const selectTodoById = (state:RootState, todoId: string | undefined): Todo | undefined | null => {
    if (!todoId) {
        return null
    }
    return state.todo.todos.find((todo: Todo) => todo.id === todoId);
}; 
export const selectProjectById = (state:RootState, projectId: string | undefined): Project | undefined | null => {
  if (!projectId) {
      return null
  }
  return state.todo.projects.find((project: Project) => project.id === projectId);
}; 
export const selectLabelIdByTodoId = createSelector(
    [selectLabelMaps, selectTodoById],
    (labelMaps, todo): string | null => {
      if (!todo) return null;
      const map = labelMaps.find((m) => m.task_id === todo.id);
      return map?.label_id ?? null;
    }
);
export const selectLabelsByTodoId = createSelector(
  [selectLabels, selectLabelIdByTodoId],
  (labels, labelId): Label[] | null => {
    if (!labelId) return null;
    // filter always returns an array, so no need for `|| null`
    return labels.filter((lbl) => lbl.id === labelId);
  }
);
export const selectFilteredTodos = createSelector(
  [selectTodos, selectProjectId],
  (todos, projectId): Todo[] => {
    if (!projectId) return [];
    return todos.filter((t) => t.project_id === projectId);
  }
);
export const selectProject = createSelector(
  [selectProjects, selectProjectId],
  (projects, projectId): Project | null => {
    return projects.find((p) => p.id === projectId) ?? null;
  }
);