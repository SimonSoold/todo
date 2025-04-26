import { createSelector } from "reselect";
import { 
    Todo,
    Project,
    Label,
    TaskLabelMap
 } from "../types";
export const selectToken = (state:any):string => state.user.token
export const selectUserId = (state:any):string => state.user.id

export const selectTodos = (state: any):Todo[] => state.todo.todos;
export const selectProjectId = (state: any):string => state.todo.projectId;
export const selectProjects = (state: any):Project[] => state.todo.projects;

export const selectLabels = (state: any):Label[] => state.todo.labels; 
export const selectLabelMaps = (state: any):TaskLabelMap[] => state.todo.taskLabelMaps;

export const selectTodoById = (state: any, todoId: string): Todo | undefined => {
    return state.todo.todos.find((todo: Todo) => todo.id === todoId);
}; 
export const selectLabelIdByTodoId = createSelector(
    [selectLabelMaps, selectTodoById],
    (labelMaps, todo): string | null => { 
        if (!todo) return null;
        const labelMap = labelMaps.find((label: any) => label.task_id === todo.id);
        if (!labelMap) return null;
        return labelMap.label_id;
    }
);
export const selectLabelsByTodoId = createSelector(
    [selectLabels, selectLabelIdByTodoId],
    (labels, labelId): Label[] | null => {
        if (!labelId) return null;
        const label = labels.filter((label: any) => label.id === labelId);
        return label || null;
    }  
)
export const selectFilteredTodos = createSelector(
    [selectTodos, selectProjectId],
    (todos, projectId): Todo[] => {
        if (projectId) {
            if (!todos) return [];
            if (!Array.isArray(todos)) return [];
            if (todos.length === 0) return [];
            const filteredTodos = todos.filter((todo: Todo) => todo.project_id === projectId);
            if (filteredTodos.length > 0) {
                return filteredTodos;
            }
        }
        return [];
    }
);
export const selectProject = createSelector(
    [selectProjects, selectProjectId],
    (projects, projectId):Project | null => {
        if (!projectId) return null;
        if (!projects) return null;
        if (!Array.isArray(projects)) return null;
        if (projects.length === 0) return null;
        const project = projects.find((project: Project) => project.id === projectId);
        return project || null;
    }
)
