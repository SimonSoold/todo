import { useEffect } from 'react';
import './App.css'
import { ThemeMenu } from './components/HamburgerMenu'
import { Routes, Route, useLocation, useNavigate } from "react-router";
import Todo from './components/ToDo';
import Login from './components/Login';
import { 
  TodoFormContainer,
  ProjectContainer
 } from './components/ToDo';
import {
  useSelector
} from 'react-redux'
function App() {
  const location = useLocation();
  const loggedIn = useSelector((state:any)=> state.user.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "To Be Is To Do";
  }, []);
  useEffect(() => {
    if (!loggedIn && (location.pathname !== '/login' && location.pathname !== '/register')) {
      navigate('/login');
    }
  }, [location]);
  return (
    <>
      <header>
        <div>
          <h1>To Be Is To Do</h1>
          <p>To Do Is To Be</p>
          <p>Do Be Do Be Do</p>
        </div>
        <div>
          <ThemeMenu />
        </div>
      </header>
      <main>
        <div>
          <Routes>
            <Route path="/" element={<Todo/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Login/>} />
            <Route path="/todo/:id" element={<TodoFormContainer/>} />
            <Route path="/todo" element={<TodoFormContainer/>} />
            <Route path="/project" element={<ProjectContainer />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </div>
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
