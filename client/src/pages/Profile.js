import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Profile</h1>

      <h3>User ID: {user.id}</h3>

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back To Dashboard
      </button>
    </div>
  );
}

export default Profile;