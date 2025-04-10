export interface User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    created_at: string; // ISO string
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
  }
  
  export type Priority = 'low' | 'medium' | 'high';
  
  export interface Todo {
    id: string;
    user_id: string;
    title: string;
    description: string;
    is_completed: boolean;
    due_date?: string | null; // ISO string or null
    priority: Priority;
    project_id?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface TaskLabelMap {
    task_id: string;
    label_id: string;
  }
  
  // --- Derived Types (for UI convenience) ---

export interface TodoWithLabels extends Todo {
    labels: Label[];
  }
  
  export interface TodoWithProject extends Todo {
    project?: Project | null;
  }
  
  export interface TodoFull extends Todo {
    labels: Label[];
    project?: Project | null;
  }
  
  // --- Utility Types for Forms ---
  
  // For creating a new todo (before it has an ID or timestamps)
  export type NewTodo = Omit<Todo, 'id' | 'created_at' | 'updated_at'> & {
    id?: string; // optional if pre-generated on frontend
  };
  
  // For editing an existing todo
  export type EditTodo = Partial<Omit<Todo, 'id' | 'user_id'>> & {
    id: string;
  };
  
  // For label form
  export type NewLabel = Omit<Label, 'id'>;
  export type EditLabel = Partial<Label> & { id: string };
  
  // For project form
  export type NewProject = Omit<Project, 'id' | 'created_at'>;
  export type EditProject = Partial<Project> & { id: string };
  
  // Generic form state wrapper (optional helper)
  export type FormState<T> = {
    values: T;
    errors?: Partial<Record<keyof T, string>>;
    isSubmitting: boolean;
    isValid: boolean;
  };