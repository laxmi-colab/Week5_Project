import { BrowserRouter, Routes, Route } from "react-router-dom";

import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AIChat from "./pages/AIChat";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 
 path="/tasks" 
 element={<Task />} 
/>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/ai-chat" element={<AIChat />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;