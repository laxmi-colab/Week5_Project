import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Profile</h1>

      <h3>Email: User Logged In</h3>

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back To Dashboard
      </button>
    </div>
  );
}

export default Profile;