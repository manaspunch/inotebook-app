import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
    const { name, email, password } = credentials;
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/CreateUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }),
        });
        const json = await response.json();

        if (json.success) {
            // Save the authtoken and redirect to home page
            localStorage.setItem("token", json.authtoken);
            props.showAlert("New user created successfully.", "success");

            navigate('/');
        }
        else { props.showAlert("Failed to create new user due to some error occured..!", "danger"); }

    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-3'>
            <h2>Please sign up here..</h2>
            <div className='container my-3'>
                <form className="col y-3" onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={handleOnChange} className="form-control" name="name" id="name" required minLength={5} value={credentials.name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email Id</label>
                        <input type="text" onChange={handleOnChange} className="form-control" name='email' id="email" required minLength={5} value={credentials.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={handleOnChange} className="form-control" name="password" required minLength={5} value={credentials.password} id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword">Confirm password</label>
                        <input type="password" onChange={handleOnChange} className="form-control" name="cpassword" id="cpassword" required minLength={5} value={credentials.cpassword} />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mb-3" >Create user</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
