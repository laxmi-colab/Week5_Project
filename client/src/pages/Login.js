import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.log("ERROR =>", err);

      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert("Backend server is not responding");
      } else {
        alert(err.message);
      }

    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={loginUser}>Login</button>

      <br /><br />

      <button
        onClick={() =>
          window.location.href = "http://localhost:5000/api/auth/google"
        }
      >
        Sign in with Google
      </button>

      <br /><br />

      <Link to="/register">Create Account</Link>
    </div>
  );
}

export default Login;