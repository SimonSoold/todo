import React, {useState} from "react";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks";
import ErrorField from "./ErrorField";
import { User } from "../types";
import Data from "../assets/mock.json"

interface ValidationItem {
    name?: string
    password?: string
}  
const Login: React.FC = () => {
    const {name, password_hash} = Data.users[0] as User;
    const [formData, setFormData] = useState<ValidationItem>({name, password: password_hash})
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<ValidationItem>({})
    
    const validate = ({ name, password }: ValidationItem) => {
        const newErrors: ValidationItem = {}
        if (!name || name.length < 3) {
            newErrors["name"] = "Name should be at least 3 characters"
        }
        if (!password || password.length < 8) {
            newErrors["password"] = "Password should be at least 8 characters"
        }
        setErrors(newErrors)
        return newErrors["name"] || newErrors["password"]
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;      
        if (!validate({name, password})) {
            dispatch(login({ name, password }));
            navigate("/");
        }
    }
    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                    autoComplete="on" 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <ErrorField>
                    {
                        errors.name
                    }
                </ErrorField>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <ErrorField>
                    {
                        errors.password
                    }
                </ErrorField>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;