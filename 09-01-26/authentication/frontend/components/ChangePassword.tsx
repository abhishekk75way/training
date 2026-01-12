import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changePassword } from "../src/utils/api/api";

function ChangePassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      alert("You must be logged in to reset your password!");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");

    try {
      await changePassword({ password });
      alert("Password reset successfully!");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h4>Reset Password</h4>

        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
