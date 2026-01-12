import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../components/Register";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import ChangePassword from "../components/ChangePassword";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { useEffect } from "react";
import { loadTheme } from "./theme";
import ThemeToggle from "../components/ThemeToggle";

function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Router>
      <h3 className="heading">Complete Authentication System</h3>

      <div style={{ textAlign: "center" }}>
        <ThemeToggle />
      </div>

      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ChangePassword />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
