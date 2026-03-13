import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { user, setUser, cart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation(); // to check if redirected from cart
  const [localUser, setLocalUser] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const url = API_URL + "/auth/signin";
      const response = await axios.post(url, localUser);
      setUser(response.data);

      // Navigate intelligently after login
      if (location.state?.fromCart || cart.length > 0) {
        navigate("/cart");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <p>
        <input
          type="text"
          value={localUser.email}
          onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          type="password"
          value={localUser.password}
          onChange={(e) =>
            setLocalUser({ ...localUser, password: e.target.value })
          }
          placeholder="Password"
        />
      </p>
      <p>
        <button onClick={handleLogin}>Login</button>
      </p>
      <p>
        <Link to="/register">New user register here</Link>
      </p>
    </div>
  );
}

export default Login;