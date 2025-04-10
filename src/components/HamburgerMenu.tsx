import React from 'react';
import { 
  useDispatch
} from 'react-redux';
import { 
  logout
} from '../redux/userSlice';
import { 
  useNavigate
} from 'react-router';
export const ThemeMenu: React.FC = () => {
  const dispatch = useDispatch();
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
            <li>Settings</li>
            <li
              onClick={handleLogout}
            >
              Logout</li>
        </ul>
    </details>
  )
};