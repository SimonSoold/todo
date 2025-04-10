import { createSelector } from "reselect";
import { Todo,Project } from "../types";

export const selectTodos = (state: any):Todo[] => state.todo.todos;
export const selectProjectId = (state: any):string => state.todo.projectId;
export const selectProjects = (state: any):Project[] => state.todo.projects;
export const selectFilteredTodos = createSelector(
    [selectTodos, selectProjectId],
    (todos, projectId): Todo[] => {
        if (projectId) {
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
        const project = projects.find((project: Project) => project.id === projectId);
        return project || null;
    }
)