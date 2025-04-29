import { useEffect } from "react";
import "./App.css"
import HamburgerMenu, { closeHamburgerMenu } from "./components/HamburgerMenu"
import { Routes, Route, useLocation, useNavigate } from "react-router";
import Todo from "./components/ToDo";
import Login from "./components/Login";
import { TodoForm } from "./components/ToDo";
import { ProjectForm } from "./components/Project";
import { logout } from "./redux/userSlice";
import {useAppSelector, useAppDispatch} from "./hooks"
import { selectToken } from "./redux/selectors";
const pathNames = [
  "/login",
  "/register"
]
function App() {
  const dispatch = useAppDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
    closeHamburgerMenu()
  };
  useEffect(() => {
    document.title = "To Be Is To Do";
  }, []);
  useEffect(() => {
    if (!pathNames.includes(location.pathname)) {
      if (!token || token?.length < 1) {
        navigate("/login")
      }
    }
  }, [location,token])
  return (
    <>
      <header>
        <div>
          <h1>To Be Is To Do</h1>
          <span>
            <span>
              <p>To Do Is To Be</p>
              <p>Do Be Do Be Do</p>
            </span>
          </span>
        </div>
        <div>
          <HamburgerMenu 
            menuItems={[
              {
                children: "Logout",
                handleClick: handleLogout,
                condition: (token?.length ?? 0) > 0
              }
            ]}
            disabled={!token || token?.length < 1}
          />
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Todo/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Login/>} />
          <Route path="/todo/:id" element={<TodoForm/>} />
          <Route path="/todo" element={<TodoForm/>} />
          <Route path="/project" element={<ProjectForm />} />
          <Route path="/project/:id" element={<ProjectForm />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
      <footer>
        <div>
          <p>Simon Soold</p>
          <p>soold.simon@gmail.com</p>
        </div>
        <div>
          <p>Copyright © 2025</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </>
  )
}

export default App
