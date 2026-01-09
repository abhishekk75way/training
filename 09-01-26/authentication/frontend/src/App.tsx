import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../components/Register"
import Login from "../components/Login"
import Dashboard from "../components/Dashboard"
import ChangePassword from "../components/ChangePassword"
import ForgotPassword from "../components/ForgotPassword"

function App() {
  return (
    <Router>
      <div className="App">
        <h3 className="heading">Complete Authentication System</h3>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
