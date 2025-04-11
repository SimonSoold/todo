import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router";
const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state: any) => state.user.loggedIn);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        }));
    }
    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);
    return (
        <div>
            <h2>Login</h2>
            <form
                onSubmit={handleSubmit}
            >
                <label htmlFor="username">Username:</label>
                <input autoComplete="true" type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;