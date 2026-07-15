import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Dashboard</h1>

      <h3>Welcome User</h3>

      <br />

      <button onClick={() => navigate("/profile")}>
        Go To Profile
      </button>

      <br />
      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;