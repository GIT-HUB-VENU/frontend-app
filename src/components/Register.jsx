import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();   // VERY IMPORTANT

  console.log(user);

  const url = `${API_URL}/auth/signup`;

  try {
    const response = await axios.post(url, user);
    console.log(response.data);
    Navigate("/login");
  } catch (error) {
    console.log("Error:", error);
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
  <h2>Registration Page</h2>

  <p>
    <input
      type="text"
      onChange={(e) => setUser({ ...user, name: e.target.value })}
      placeholder="Name"
    />
  </p>

  <p>
    <input
      type="text"
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="Email"
    />
  </p>

  <p>
    <input
      type="password"
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="Password"
    />
  </p>

  <p>
    <button type="submit">Submit</button>
  </p>

  <p>
    <Link to="/login">Already a member? Login here</Link>
  </p>
</form>
    </div>
  );
}

export default Register;