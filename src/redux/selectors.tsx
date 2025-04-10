import { createSelector } from "reselect";
import { Todo } from "../types";

export const selectTodos = (state: any) => state.todo.todos;
export const selectProjectId = (state: any) => state.todo.projectId;

export const selectFilteredTodos = createSelector(
    [selectTodos, selectProjectId],
    (todos, projectId) => {
        if (projectId) {
            const filteredTodos = todos.filter((todo: Todo) => todo.project_id === projectId);
            if (filteredTodos.length > 0) {
                return filteredTodos;
            }
        }
        return todos;
    }
);