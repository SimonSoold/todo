import './App.css'
import { ThemeMenu } from './components/HamburgerMenu'
import { Routes, Route } from "react-router";
import Todo from './components/ToDo';
import Login from './components/Login';

function App() {
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
            <Route path="/auth" element={<Login/>} />
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
