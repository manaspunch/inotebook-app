import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": credentials.email,
                "password": credentials.password
            }),
        });
        const json = await response.json();

        if (json.success) {
            // Save the authtoken and redirect to home page
            localStorage.setItem("token", json.authtoken);
            navigate('/');
        }
        else { alert("Invalid credentials"); }

    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" className="form-control" style={{ width: '50%' }} onChange={handleOnChange} id="email" value={credentials.email} name="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" onChange={handleOnChange} id="password" value={credentials.password} name="password" className="form-control" style={{ width: '50%' }} />

            </div>
            <button type="button" class="btn btn-success" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
