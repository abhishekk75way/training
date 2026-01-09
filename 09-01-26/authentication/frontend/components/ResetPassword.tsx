import { useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../src/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token"); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing token!");
      return;
    }

    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setError("");

    try {
      await resetPassword(token, { password });
      alert("Password updated successfully!");
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

export default ResetPassword;
