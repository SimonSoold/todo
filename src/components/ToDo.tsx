import React from 'react';
import { Todo,Project } from '../types';
import {
  useSelector, useDispatch 
} from 'react-redux'
import {setProjectId} from "../redux/todoSlice";
import { selectFilteredTodos } from '../redux/selectors';
export const TodoContainer: React.FC = () => {
  return (
    <div
      className='container'
    >
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
  const projectId = useSelector((state:any)=> state.todo.projectId);
  const projects = useSelector((state:any)=> state.todo.projects);
  const handleChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProjectId(e.target.value));
  }
  return (
    <div
      className='todoProjectSelector'
    >
      {
        projects.length === 0
        ?
        <p>No projects available.</p>
        : 
        <select value={projectId} onChange={handleChange} size={4}>
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
        todos.map((todo: Todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))
      }
    </>
  );
}
export const TodoItem: React.FC<Todo> = ({ id, title, is_completed }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <p>ID: {id}</p>
        <p>Status: {is_completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    </div>
  );
}
export const TodoForm: React.FC<{ onSubmit: (todo: Todo) => void }> = ({ onSubmit }) => {
    const [title, setTitle] = React.useState('');
    const [completed, setCompleted] = React.useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //onSubmit({ id: Date.now().toString(), title, completed });
        setTitle('');
        setCompleted(false);
    };
    
    return (
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo Title"
              required
          />
          <label>
              <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              />
              Completed
          </label>
          <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoContainer;