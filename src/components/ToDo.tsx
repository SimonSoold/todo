import React, { useState } from "react";
import { Todo,
  Priority,
  Label,
  AddLabelProps,
  InputChangeEvent
} from "../types";
import {
  setComplete,
  deleteTodo,
  editTodo,
  addTodo,
  addLabel
} from "../redux/todoSlice";
import { 
  selectFilteredTodos,
  selectProjectId,
  selectLabelsByTodoId,
  selectUserId,
  selectTodoById
} from "../redux/selectors";
import { 
  Link, 
  useNavigate,
  useParams
} from "react-router";
import ColorPicker from "./ColorPicker";
import { 
  useAppDispatch,
  useAppSelector,
  useToggle,
  useDateInput
} from "../hooks";
import ErrorField from "./ErrorField";
import { RootState } from "../redux/store"
import { ProjectSelector } from "./Project";
import { toShortDateString } from "../utils/utils";
export const TodoContainer: React.FC = () => {
  return (
    <div
      className="todo container"
    >
      <div>
        <div
          className="navigation"
        >
          <Link to="/project">
            New Project
          </Link>
          <Link to="/todo">
            New Todo
          </Link>
        </div>
        <ProjectSelector />
      </div>
      <div
        className="todoList container">
        <TodoList />
      </div>
    </div>
  );
}
export const TodoList: React.FC = () => {
  const todos = useAppSelector(selectFilteredTodos);
  return (
    <>
      {
        todos.map((todo: Todo,index:number) => (
          <TodoItem key={index} {...todo} />
        ))
      }
    </>
  );
}
const AddLabel = ({ id }:AddLabelProps) => {
  const dispatch = useAppDispatch()

  const user_id = useAppSelector(selectUserId);

  const [edit, toggleEdit] = useToggle(false)

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#000000")
;
  const handleChange = (e: InputChangeEvent) => {
    setName(e.target.value);
  }
  const handleSave = () => {
    if (!name || name.length === 0) {
      alert("Label name is required");
      return;
    }
    dispatch(addLabel({ name, id, user_id, color }));
    setName("");
    setColor("#000000")
    toggleEdit();
  }
  const handleAdd = () => {
    if (!name || name.length === 0) {
      alert("Label name is required");
      return;
    }
    dispatch(addLabel({ name, id, user_id, color }));
    setName("");
  }
  const handleCancel = () => {
    toggleEdit();
    setName("");
    setColor("#000000")
  }
  const handleColor = (e: InputChangeEvent) => {
    setColor(e.target.value)
  }
  if (edit) {
    return (
      <div
        className="addLabel container"
      >
        <input
          type="text"
          placeholder="Add Label"
          onChange={handleChange}
          value={name}
        />
        <span
          style={{
            margin: "8px 0"
          }}
          className="labelColorPicker"
        >
          <ColorPicker         
              color={color}
              handleColor={handleColor}
          />
        </span>
        <div>
          <button
            className="cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    )
  }
  return (
    <button
      className="addLabelButton"
      onClick={() => toggleEdit()}
    >
      Add Label
    </button>
  )
}
export const TodoItem = ({ id, title, is_completed, priority, due_date, description }:Todo) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const labels = useAppSelector((state:RootState) => selectLabelsByTodoId(state, id));

  const handleChange = (e: InputChangeEvent) => {
    dispatch(setComplete({ id, completed: e.target.checked }));
  }
  const handleEdit = () => {
    if (!id || id.length === 0) {
      alert("Todo ID is required");
      return;
    }
    navigate(`/todo/${id}`)
  }
  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
  }
  return (
    <div
      className="todoItem container"
    >
      <h2>{title}</h2>
      {
        description && description.length > 0
        ?
        <div
          className="description container"
        >
          <p>{description}</p>
        </div>
        : 
        null
      }
      <div
        className="container"
      >
        <div className="todoDetails container">
          <p>Priority: {priority}</p>
          {
            due_date && due_date.length
            ?
            <p>Due date: {due_date.substring(0,10)}</p>
            :
            null
          }
          <p className="status">Completed: <input name="is_completed" type="checkbox" checked={is_completed} onChange={handleChange}/></p>
          <span>
            {
              labels && labels.length > 0
              ?
              <p>Labels:
                <span>
                  {labels.map((label:Label, index:number) => {
                  let currentLabel = label.name
                  if (labels.length !== 1) {
                    if (labels.length -1 > index) {
                      currentLabel += ","
                    }
                  } 
                  return <span key={index} style={{color:label.color || "default"}}>{currentLabel}</span>
                })}
                </span>
              </p>
              :
              null
            }
          </span>
          <AddLabel id={id}/>
        </div>
        <div className="actions">
          <button
            className="edit"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export const TodoForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams<string>();

    const userId = useAppSelector(selectUserId);
    const projectId = useAppSelector(selectProjectId);
    let todo = useAppSelector((state:RootState) => selectTodoById(state, params.id));
    if (!todo) {
      todo = {
        id: "", // Default empty string for id
        created_at: "", // Default empty string for created_at
        updated_at: "", // Default empty string for updated_at
        title: "",
        description: "",
        is_completed: false,
        due_date: "",
        priority: "low",
        project_id: projectId as string,
        user_id: userId as string,
      }
    }

    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description);
    const [completed, setCompleted] = useState<boolean>(todo.is_completed);
    const [priority, setPriority] = useState<Priority>(todo.priority);
    const dueDate = useDateInput(todo.due_date || "");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null)
      if (!title) {
        alert("Title is required");
        return;
      }
      const newTodo:Todo = {
        ...todo,
        description,  
        is_completed: completed,
        due_date: dueDate.value,
        title
      }
      try {
        if (params?.id && newTodo) {
          dispatch(editTodo(newTodo));
        } else if (newTodo) {
          dispatch(addTodo(newTodo));
        } else {
          setError("Something went wrong.")
          return
        }
        navigate("/");
      } catch (error) {
        setError("Something went wrong.")
      }
    };
    const handleCancel = () => {
      navigate("/");
    }
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="todoForm">
          <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo Title"
              required
          />
          <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todo Description"
          />
          <select
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              size={4}
          >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
          </select>
          <input
              autoComplete="true"
              name="due_date"
              type="date"
              min={(todo.due_date && todo.due_date.length > 0) ? toShortDateString(todo.due_date) : new Date().toISOString().substring(0,10)} // Set minimum date to today
              {...dueDate}
          />
          <label
            className="status"
          >
              Completed:
              <input
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
          </label>
          <div className="error">
            <ErrorField>
              {
                error
              }
            </ErrorField>
          </div>
          <div
            className="actions"
          >
            <button onClick={handleCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
}

export default TodoContainer;