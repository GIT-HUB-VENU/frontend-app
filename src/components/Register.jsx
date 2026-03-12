import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
    const [user, setUser] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
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