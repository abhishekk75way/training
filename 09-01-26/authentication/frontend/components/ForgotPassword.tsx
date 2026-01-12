import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "../src/utils/api/api";

// validation schema
const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    try {
      await forgotPassword({ email: data.email });
      alert("Check your email for the reset link.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>Forgot Password</h4>

        <div className="input-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p className="error-text">{errors.email.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="auth-links">
          <p>
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
