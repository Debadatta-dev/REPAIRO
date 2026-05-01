import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import RequestDetails from "./pages/RequestDetails";
import ShopDashboard from "./pages/ShopDashboard";
import AgentDashboard from "./pages/AgentDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/user" element={<UserDashboard />} />
             <Route path="/requestdetails" element={<RequestDetails />} />
             <Route path="/shop" element={<ShopDashboard />} />
             <Route path="/agent" element={<AgentDashboard />} />
      </Routes>
    </div>
  );
}

export default App;