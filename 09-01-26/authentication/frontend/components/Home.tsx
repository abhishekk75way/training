import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../src/utils/api/api";

function Home() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTestApi = async () => {
    setLoading(true);
    setApiMessage(null);

    try {
      const res = await api.get("/auth/test");
      setApiMessage(res.data?.message || "Request successful");
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong";
      setApiMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="dashboard-container top-align">
        <div className="dashboard-card">
          <h2 className="dashboard-title">Authenticating your account…</h2>
          <p className="dashboard-text">
            We’re confirming your session. This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container top-align">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Account Dashboard</h2>

        <p className="dashboard-text">
          You are successfully signed in. Use the options below to manage your account.
        </p>

        <button
          className="dashboard-button"
          onClick={handleTestApi}
          disabled={loading}
        >
          {loading ? "Testing API..." : "Hit Protected Service"}
        </button>

        {apiMessage && (
          <p
            className="dashboard-text"
            style={{
              marginTop: "12px",
              color: apiMessage.toLowerCase().includes("blocked")
                ? "red"
                : "green",
            }}
          >
            {apiMessage}
          </p>
        )}

        <button
          className="dashboard-button"
          style={{ marginTop: "20px", background: "#444" }}
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Home;
