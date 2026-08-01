import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          email,
          password,
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Cannot connect to backend server");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={registerUser}>Register</button>

      <br />
      <br />

      <Link to="/">Already have an account?</Link>
    </div>
  );
}

export default Register;