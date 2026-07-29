import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const token = localStorage.getItem("token");

    if(!token){
      navigate("/");
      return;
    }


    fetch("http://localhost:5000/api/auth/profile", {

      method:"GET",

      headers:{
        "Authorization": `Bearer ${token}`
      }

    })

    .then(res => res.json())

    .then(data => {

      setUser(data);
      setLoading(false);

    })

    .catch(error => {

      console.log(error);
      localStorage.removeItem("token");
      navigate("/");

    });


  }, [navigate]);



  const logout = () => {

    localStorage.removeItem("token");
    navigate("/");

  };



  if(loading){

    return (
      <h2 style={{textAlign:"center", marginTop:"80px"}}>
        Loading Dashboard...
      </h2>
    );

  }



  return (

    <div style={{
      textAlign:"center",
      marginTop:"80px"
    }}>


      <h1>Dashboard</h1>


      {
        user && (

          <div>

            <h3>
              Welcome
            </h3>


            <p>
              Email: {user.email}
            </p>


          </div>

        )
      }


      <br/>


      <button onClick={() => navigate("/profile")}>
        Go To Profile
      </button>


      <br/>
      <br/>


      <button onClick={logout}>
        Logout
      </button>


    </div>

  );

}


export default Dashboard;