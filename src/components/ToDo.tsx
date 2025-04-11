import React, { useState } from 'react';
import { Todo,
  Project,
  TodoFormProps,
  Priority,
  Label
} from '../types';
import {
  useSelector, 
  useDispatch
} from 'react-redux'
import {
  setProjectId,
  setComplete,
  deleteTodo,
  editTodo,
  addTodo,
  createProject,
  addLabel
} from "../redux/todoSlice";
import { 
  selectFilteredTodos,
  selectProjectId,
  selectProjects,
  selectLabelsByTodoId,
  selectProject
} from '../redux/selectors';
import { 
  Link, 
  useNavigate,
  useParams
} from 'react-router';
import { isNearWhite } from '../utils/utils';


export const TodoContainer: React.FC = () => {
  return (
    <div
      className='container'
    >
      <div
        className='navigation'
      >
        <Link to="/project">
          New Project
        </Link>
        <Link to="/todo">
          New Todo
        </Link>
      </div>
      <ProjectSelector />
      <div
        className='todoList'>
        <TodoList />
      </div>
    </div>
  );
}
export const ProjectSelector: React.FC = () => {
  const dispatch = useDispatch();
  const projectId = useSelector(selectProjectId);
  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectProject)
  const handleChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProjectId(e.target.value));
  }
  return (
    <div
      className='todoProjectSelector'
      style={{
        background: currentProject?.color || '#fff',
        padding: "8px"
      }}
    >
      {
        projects.length === 0
        ?
        <p>No projects available.</p>
        : 
        <select name="project" value={projectId} onChange={handleChange} size={4}>
          {
            projects.map((project: Project, index:number) => {
              return (
                <option key={index} value={project.id}>
                  {project.name}
                </option>
              )
            })
          }
        </select>
      }
    </div>
  )
}
export const TodoList: React.FC = () => {
  const todos = useSelector(selectFilteredTodos);
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
const AddLabel: React.FC<{ id: string }> = ({ id }) => {
  const user_id = useSelector((state:any) => state.user.id);
  const [edit, setEdit] = useState<boolean>(false); 
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('#000000')
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const handleSave = () => {
    if (!name || name.length === 0) {
      alert('Label name is required');
      return;
    }
    dispatch(addLabel({ name, id, user_id, color }));
    setName('');
    setColor('#000000')
    setEdit(!edit);
  }
  const handleAdd = () => {
    if (!name || name.length === 0) {
      alert('Label name is required');
      return;
    }
    dispatch(addLabel({ name, id, user_id, color }));
    setName('');
  }
  const handleCancel = () => {
    setEdit(!edit);
    setName('');
    setColor('#000000')
  }
  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNearWhite(e.target.value)) {
      setColor(e.target.value)
    } 
  }
  if (edit) {
    return (
      <div
        className="addLabel"
      >
        <input
          type="text"
          placeholder="Add Label"
          onChange={handleChange}
          value={name}
        />
        <input
          style={{
            margin: "8px 0"
          }}
          name='color'
          type="color"
          value={color}
          onChange={handleColor}
        />
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
      onClick={() => setEdit(!edit)}
    >
      Add Label
    </button>
  )
}
export const TodoItem: React.FC<Todo> = ({ id, title, is_completed, priority, due_date, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const labels = useSelector((state:any) => selectLabelsByTodoId(state, id));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setComplete({ id, completed: e.target.checked }));
  }
  const handleEdit = () => {
    if (!id || id.length === 0) {
      alert('Todo ID is required');
      return;
    }
    navigate(`/todo/${id}`)
  }
  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
  }
  return (
    <div>
      <h2>{title}</h2>
      {
        description && description.length > 0
        ?
        <div
          className="description"
        >
          <p>{description}</p>
        </div>
        : 
        null
      }
      <div
        className="todoItem">
        <div className='todoDetails'>
          <p>Priority: {priority}</p>
          {
            due_date && due_date.length > 0
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
        <div className='todoActions'>
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
export const ProjectContainer: React.FC = () => {
  return (
    <div
      className='container'
    >
      <ProjectForm />
    </div>
  );
}
export const ProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Project name is required');
      return;
    }
    dispatch(createProject({ name, color: color.length > 0 ? color : null }));
    navigate('/');
  };
  const handleCancel = () => {
    navigate('/');
  }
  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNearWhite(e.target.value)) {
      setColor(e.target.value)
    } 
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        name='name'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        required
      />
      <input
        name='color'
        type="color"
        value={color}
        onChange={handleColor}
      />
      <div
        className="todoActions">
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );  
}
export const TodoFormContainer: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const userId = useSelector((state:any) => state.user.id);
  const projectId = useSelector(selectProjectId);
  const params = useParams()
  const navigate = useNavigate();
  const todo = todos.find((todo: Todo) => todo.id === params?.id) || {
    id: '', // Default empty string for id
    created_at: '', // Default empty string for created_at
    updated_at: '', // Default empty string for updated_at
    title: '',
    description: '',
    is_completed: false,
    due_date: '',
    priority: 'low',
    project_id: projectId,
    user_id: userId,
  }
  const handleSave = (newTodo:Todo|null) => {
    if (params?.id && newTodo) {
      dispatch(editTodo(newTodo));
    } else {
      dispatch(addTodo(newTodo));
    }
    navigate('/');
  }
  return (
    <div
      className='container'
    >
      <TodoForm todo={todo} handleSave={handleSave}/>
    </div>
  );
}


export const TodoForm: React.FC<TodoFormProps> = ({ todo, handleSave }: TodoFormProps) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description);
    const [completed, setCompleted] = useState<boolean>(todo.is_completed);
    const [priority, setPriority] = useState<Priority>(todo.priority);
    const [dueDate, setDueDate] = useState<string>(todo.due_date || '');
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title) {
        alert('Title is required');
        return;
      }
      handleSave({
          ...todo,
          description,  
          is_completed: completed,
          priority,
          due_date: dueDate,
          title
      })
    };
    const handleCancel = () => {
      navigate('/');
    }
    return (
        <form onSubmit={handleSubmit}>
          <input
              name='title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo Title"
              required
          />
          <textarea
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todo Description"
          />
          <select
              name='priority'
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              size={4}
          >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
          </select>
          <input
              autoComplete='true'
              name='due_date'
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().substring(0,10)} // Set minimum date to today
          />
          <label
            className="status"
          >
              Completed:
              <input
                name='completed'
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
          </label>
          <div
            className="todoActions"
          >
            <button onClick={handleCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
    );
}

export default TodoContainer;