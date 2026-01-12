import { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changePassword } from "../src/utils/api/api";

function ChangePassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Ensure user is logged in
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      alert("You must be logged in to change your password.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid request.");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    setError("");

    try {
      await changePassword({ password });
      alert("Password changed successfully!");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h4>Change Password</h4>

        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
