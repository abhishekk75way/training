import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { resetPassword } from "../src/utils/api/api";

type TokenStatus = "checking" | "valid" | "expired" | "used" | "invalid";

function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("checking");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenStatus("invalid");
      return;
    }

    axios
      .get(`http://localhost:8080/reset-password/${token}`)
      .then(() => setTokenStatus("valid"))
      .catch((err: AxiosError<{ error: string }>) => {
        const msg = err.response?.data?.error;

        if (msg === "token expired") setTokenStatus("expired");
        else if (msg === "token already used") setTokenStatus("used");
        else setTokenStatus("invalid");
      });
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tokenStatus !== "valid") return;

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setError("");

    try {
      await resetPassword(token as string, { password });
      alert("Password updated successfully!");
      navigate("/login");
    } catch {
      alert("Reset failed");
    }
  };

  if (tokenStatus === "checking")
    return <h3 style={{ textAlign: "center" }}>Checking reset link…</h3>;

  if (tokenStatus === "expired")
    return (
      <h3 style={{ color: "red", textAlign: "center" }}>
        This reset link has expired.
      </h3>
    );

  if (tokenStatus === "used")
    return (
      <h3 style={{ color: "red", textAlign: "center" }}>
        This reset link has already been used.
      </h3>
    );

  if (tokenStatus === "invalid")
    return (
      <h3 style={{ color: "red", textAlign: "center" }}>
        Invalid or expired reset link.
      </h3>
    );

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

          {/* error stays right under the input */}
          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
