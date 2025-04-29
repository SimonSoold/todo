export interface TodoState {
  todos: Todo[];
  projectId: string;
  projects: Project[];
  labels: Label[];
  taskLabelMaps: TaskLabelMap[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    password_hash?: string;
    created_at: string;
    token?: string;
  }
  
  export interface Project {
    id: string;
    user_id: string;
    name: string;
    color?: string | null;
    created_at: string;
  }
  
  export interface Label {
    id: string;
    user_id: string;
    name: string;
    color?: string | null;
    created_at?: string;
  }
  
  export type Priority = "low" | "medium" | "high";

  export interface AddLabelProps {
    id: string;
  }
  export interface Todo {
    id: string;
    user_id: string;
    title: string;
    description: string;
    is_completed: boolean;
    due_date?: string | null;
    priority: Priority;
    project_id?: string;
    created_at: string;
    updated_at: string;
  }
  export interface TaskLabelMap {
    task_id: string;
    label_id: string;
  }
  export interface TodoForm {
    todo: Todo;
    handleSave: (todo: Todo | null) => void;
  }
  export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;