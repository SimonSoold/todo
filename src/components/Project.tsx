import React, { useState } from "react";
import {
  Project,
  InputChangeEvent
} from "../types";
import {
  setProjectId,
  createProject,
  deleteProject, 
  editProject
} from "../redux/todoSlice";
import { 
  selectProjectId,
  selectProjects,
  selectProject,
  selectUserId,
  selectProjectById
} from "../redux/selectors";
import { 
  useNavigate,
  useParams
} from "react-router";
import ColorPicker from "./ColorPicker";
import { 
  useAppDispatch,
  useAppSelector
} from "../hooks";
import ErrorField from "./ErrorField";
import { RootState } from "../redux/store";

export const ProjectSelector: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const projectId = useAppSelector(selectProjectId);
  const projects = useAppSelector(selectProjects);
  const currentProject = useAppSelector(selectProject);

  const handleProject = (id:string) => {
    dispatch(setProjectId(id));
  }
  const handleEdit = (id:string) => {
    if (!id || id.length === 0) {
      alert("Project ID is required");
      return;
    }
    navigate(`/project/${id}`)
  }
  const handleDelete = (id:string) => {
    dispatch(deleteProject({ id }));
  }
  return (
    <div
      className="todoProjectSelector"
      style={{
        background: currentProject?.color || "#fff",
        padding: "8px"
      }}
    >
      {
        projects.length === 0
        ?
        <p>No projects available.</p>
        : 
        <div className="projectSelector">
          {
            projects.map((project: Project, index:number) => {
              const className = projectId === project.id ? "projectItem checked" : "projectItem"
              return (
                <div className={className} key={index}>
                  <span onClick={() => handleProject(project.id)}>
                    {project.name}
                  </span>
                  <div className="actions">
                    <button
                      className="edit"
                      onClick={() => handleEdit(project.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}
export const ProjectForm: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams<string>();
    const project = useAppSelector((state:RootState) => selectProjectById(state, params.id))
    const dispatch = useAppDispatch()

    const [error, setError] = useState<string | null>(null)
    ;
    const [name, setName] = useState<string>(project?.name ? project.name : "");
    const [color, setColor] = useState<string>(project?.color ? project.color : "#000000");
    const userId = useAppSelector(selectUserId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)
        try {
            if (!name) {
                alert("Project name is required");
                return;
            }
            if (project) {
              dispatch(editProject({...project, name, color}))
            } else {
              dispatch(createProject({ name, color: color.length > 0 ? color : "", user_id: userId }));
            }
            navigate("/");
        } catch (error) {
            setError("Something went wrong.")
        }
    };
    const handleCancel = () => {
        navigate("/");
    }
    const handleColor = (e: InputChangeEvent) => {
        setColor(e.target.value)
    }
    return (
        <div className="projectForm container">
        <form onSubmit={handleSubmit}>
            <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
            required
            />
            <span
            className="labelColorPicker"
            >
            <ColorPicker       
                color={color}
                handleColor={handleColor}
            />
            </span>
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