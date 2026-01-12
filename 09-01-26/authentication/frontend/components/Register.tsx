import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../src/utils/api/api";

// validation schema
const signupSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      alert("Account created! Please login.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>Sign Up</h4>

        <div className="input-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p className="error-text">{errors.email.message}</p>
          )}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>

        <div className="auth-links">
          <p>
            <Link to="/login">Already have an account? Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
