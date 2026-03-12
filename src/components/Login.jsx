import { Link } from "react-router-dom";    
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const [user, setUser] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();
    return (
        <div className="Login">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email" /><br />
                <input type="password" placeholder="Password" /><br />
                <button type="submit">Login</button>
            </form>
             <p><Link to="/register">New user register here</Link></p>
        </div>
    );
}

export default Login;