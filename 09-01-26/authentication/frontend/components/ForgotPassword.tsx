import { useState } from "react";
import type { FormEvent } from "react";
import { forgotPassword } from "../src/utils/";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email) {
      setError("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");

    try {
      await forgotPassword({ email });
      alert("Check your email for the reset link!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h4>Forgot Password</h4>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit">Send Reset Link</button>
         <div className="auth-links">
          <p><Link to="/">Back</Link></p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
