import React from "react";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks";
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;
      
        dispatch(login({ name, password }));
        navigate("/");
    }
    return (
        <div>
            <h2>Login</h2>
            <form
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name:</label>
                <input autoComplete="true" type="text" id="name" name="name" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;