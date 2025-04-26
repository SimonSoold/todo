import React from 'react';
import { 
  logout
} from '../redux/userSlice';
import { 
  useNavigate
} from 'react-router';
import { useAppDispatch } from '../hooks';
export const ThemeMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
    document.getElementById("hamburger")?.removeAttribute("open");
  };
  return (
    <details
      id='hamburger'
    >
        <summary>
            ☰
        </summary>
        <ul>
            <li
              onClick={handleLogout}
            >
              Logout</li>
        </ul>
    </details>
  )
};