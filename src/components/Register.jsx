import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        const url = API_URL+"/auth/signup";
        const response = await axios.post(url,user);
        Navigate("/login")
        // Handle registration logic here
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                /><br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                /><br />
                <button type="submit">Register</button>
                <Link to="/login">Already Have Account ? Login</Link>
            </form>
        </div>
    );
}

export default Register;